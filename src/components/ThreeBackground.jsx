import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Get current dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent background to let CSS styles breathe

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting (Industrial flat lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 1. undulation Grid plane
    const gridCols = 30;
    const gridRows = 30;
    const gridGeo = new THREE.PlaneGeometry(40, 40, gridCols, gridRows);
    gridGeo.rotateX(-Math.PI / 2);

    // Material with high contrast
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.position.y = -2;
    scene.add(gridMesh);

    // Store original grid vertices to apply undulating math
    const originalPositions = gridGeo.attributes.position.array.slice();

    // 2. Floating Brutalist Monoliths / Geometry
    const meshes = [];
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.ConeGeometry(1.2, 2.5, 4),
      new THREE.BoxGeometry(1, 4, 1),
      new THREE.OctahedronGeometry(1.5, 0),
    ];

    const monolithMat = new THREE.MeshNormalMaterial({
      wireframe: false,
      transparent: true,
      opacity: 0.03, // extremely subtle solid backdrop to catch lights
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // Create several floating monolith meshes
    for (let i = 0; i < 6; i++) {
      const geo = geometries[i % geometries.length];
      const mesh = new THREE.Group();
      
      const solidMesh = new THREE.Mesh(geo, monolithMat);
      const wireMesh = new THREE.Mesh(geo, wireframeMat);
      
      mesh.add(solidMesh);
      mesh.add(wireMesh);

      // Random placements
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 8 - 2,
        (Math.random() - 0.5) * 15 - 5
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const initialX = mesh.position.x;
      const initialRotX = mesh.rotation.x;
      const initialRotY = mesh.rotation.y;
      mesh.userData = {
        spinX: (Math.random() - 0.5) * 0.005,
        spinY: (Math.random() - 0.5) * 0.005,
        floatSpeed: Math.random() * 0.002 + 0.001,
        floatRange: Math.random() * 1.5 + 0.5,
        initialY: mesh.position.y,
        initialX: initialX,
        initialRotX: initialRotX,
        initialRotY: initialRotY,
        seed: Math.random() * 100,
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    // Interactive vectors
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    let scrollY = 0;
    let targetScrollY = 0;

    // Listeners
    const handleMouseMove = (e) => {
      // Convert to normalized device coordinates (-1 to +1)
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Animation Loop
    const clock = new THREE.Clock();
    let timer = new THREE.Timer();

    const animate = () => {
      const reqId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      timer.update(delta);

      const elapsedTime = timer.getElapsed();

      // Check color mode dynamically to colorize the 3D canvas
      const isGrayscale = document.documentElement.classList.contains("grayscale-mode");
      if (isGrayscale) {
        gridMat.color.setHex(0x000000);
        wireframeMat.color.setHex(0x000000);
        gridMat.opacity = 0.15;
        wireframeMat.opacity = 0.25;
      } else {
        gridMat.color.setHex(0x1A2BFE); // Royal Cobalt Blue grid lines in Color Mode
        wireframeMat.color.setHex(0xFF6B00); // Electric Orange floating wireframes in Color Mode
        gridMat.opacity = 0.25; // slightly higher opacity for colored aesthetics
        wireframeMat.opacity = 0.35; // slightly higher opacity for colored aesthetics
      }

      // Smooth mouse easing with slightly slower response for more fluid feel
      mouse.x += (targetMouse.x - mouse.x) * 0.03;
      mouse.y += (targetMouse.y - mouse.y) * 0.03;

      // Smooth scroll easing
      scrollY += (targetScrollY - scrollY) * 0.05;

      // 1. Animate Grid Undulations + Cursor Gravity Well
      const positionAttr = gridGeo.attributes.position;
      for (let i = 0; i < positionAttr.count; i++) {
        // Original X, Y, Z
        const ix = originalPositions[i * 3];
        const iy = originalPositions[i * 3 + 1];
        const iz = originalPositions[i * 3 + 2];

        // Apply undulating waves
        let waveY = Math.sin(ix * 0.2 + elapsedTime * 0.8) * 0.3 + 
                     Math.cos(iz * 0.2 + elapsedTime * 0.8) * 0.3;

        // Apply cursor interaction logic: warp vertices near the interactive mouse position
        // Project mouse vector to plane coordinates roughly
        const mx = mouse.x * 20;
        const mz = -mouse.y * 20;

        const dist = Math.sqrt((ix - mx) ** 2 + (iz - mz) ** 2);
        if (dist < 8) {
          // pull down vertices that are close
          const pull = (8 - dist) / 8;
          waveY -= pull * 2.0;
        }

        positionAttr.setY(i, waveY);
      }
      positionAttr.needsUpdate = true;

      // 2. Animate Floating Brutalist Monoliths
      meshes.forEach((mesh) => {
        // Rotate monolith
        const scrollRot = Math.min(scrollY * 0.00005, 0.3);
        mesh.rotation.x = mesh.userData.initialRotX + Math.sin(elapsedTime * mesh.userData.spinX * 100) * 0.1 + scrollRot;
        mesh.rotation.y = mesh.userData.initialRotY + Math.cos(elapsedTime * mesh.userData.spinY * 100) * 0.1 + scrollRot;

        // Sinusoidal float floating
        mesh.position.y = mesh.userData.initialY + 
          Math.sin(elapsedTime * 1.5 * mesh.userData.floatSpeed * 200 + mesh.userData.seed) * mesh.userData.floatRange;

        // Parallax horizontal shifts bound to mouse movement
        const targetOffsetX = mouse.x * 1.5;
        mesh.position.x += (mesh.userData.initialX + targetOffsetX - mesh.position.x) * 0.02;
      });

      // Camera parallax scroll shifts (clamped to prevent infinite drift)
      const scrollCamOffset = Math.min(scrollY * 0.005, 8);
      camera.position.y = 5 - scrollCamOffset;
      camera.lookAt(0, Math.max(-scrollY * 0.002, -3), 0);

      renderer.render(scene, camera);
    };

    const animationId = requestAnimationFrame(animate);

    // Resizing
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-[0.35]"
      id="three-background-canvas"
    />
  );
}
