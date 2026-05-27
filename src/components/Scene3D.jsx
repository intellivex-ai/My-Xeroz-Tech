import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { LOGO_GEOMETRIES } from './LogoGeometries'

// High-performance background particles system
function FloatingParticles({ count = 80 }) {
  const pointsRef = useRef()
  const positions = useRef(new Float32Array(count * 3))
  const velocities = useRef(new Float32Array(count * 3))

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 8
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 6

      velocities.current[i * 3] = (Math.random() - 0.5) * 0.05
      velocities.current[i * 3 + 1] = (Math.random() - 0.5) * 0.05
      velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 0.05
    }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position

    for (let i = 0; i < count; i++) {
      positions.current[i * 3] += velocities.current[i * 3] * delta
      positions.current[i * 3 + 1] += velocities.current[i * 3 + 1] * delta
      positions.current[i * 3 + 2] += velocities.current[i * 3 + 2] * delta

      if (Math.abs(positions.current[i * 3]) > 4) positions.current[i * 3] *= -0.9
      if (Math.abs(positions.current[i * 3 + 1]) > 4) positions.current[i * 3 + 1] *= -0.9
      if (Math.abs(positions.current[i * 3 + 2]) > 3) positions.current[i * 3 + 2] *= -0.9

      posAttr.setXYZ(i, positions.current[i * 3], positions.current[i * 3 + 1], positions.current[i * 3 + 2])
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#1b1b1b"
        size={0.025}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.15}
        depthWrite={false}
      />
    </points>
  )
}

function Model({ onProgressUpdate, pointLightRef, autoRun = true, speedMultiplier = 1, progress = 0 }) {
  const groupRef = useRef()
  const { mouse, viewport } = useThree()

  // Refs for each logo element mesh
  const meshLeftBottomRef = useRef() // mesh_id26
  const meshRightRef = useRef()      // mesh_id27
  const meshLeftTopRef = useRef()    // mesh_id28

  // Store original local position & rotation (extracted from glTF nodes translation/rotation)
  const origPosRef = useRef({
    leftBottom: new THREE.Vector3(-0.004658897407352924, -0.47394436597824097, 0.19997070729732513),
    right: new THREE.Vector3(0.4637259244918823, 0.015488281846046448, 0.19997070729732513),
    leftTop: new THREE.Vector3(-0.002171608153730631, 0.604931652545929, 0.19997070729732513)
  })

  const origRotRef = useRef({
    leftBottom: new THREE.Euler(0, 0, 0),
    right: new THREE.Euler(0, 0, 0),
    leftTop: new THREE.Euler(0, 0, 0)
  })

  // Spring physics states (positions & rotations)
  const physicsRef = useRef({
    leftBottom: { pos: new THREE.Vector3(), vel: new THREE.Vector3(), rot: new THREE.Vector3(), rotVel: new THREE.Vector3() },
    right: { pos: new THREE.Vector3(), vel: new THREE.Vector3(), rot: new THREE.Vector3(), rotVel: new THREE.Vector3() },
    leftTop: { pos: new THREE.Vector3(), vel: new THREE.Vector3(), rot: new THREE.Vector3(), rotVel: new THREE.Vector3() }
  })

  // Timeline progress ref (0 to 100)
  const progressRef = useRef(0.0)

  // Track active pointer state for touch devices (so it returns to center when finger is released)
  const isPointerDownRef = useRef(false)
  const hasHoverRef = useRef(false)

  useEffect(() => {
    hasHoverRef.current = window.matchMedia('(hover: hover)').matches
    const handlePointerDown = () => { isPointerDownRef.current = true }
    const handlePointerUp = () => { isPointerDownRef.current = false }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  useEffect(() => {
    const phys = physicsRef.current
    const orig = origPosRef.current
    const aspect = viewport.aspect
    const initialSpread = aspect < 0.9 ? Math.max(0.45, aspect * 1.1) : 1.0

    // Left Bottom offsets to bottom-left
    phys.leftBottom.pos.copy(orig.leftBottom).add(new THREE.Vector3(-1.8, -1.2, 0.8).multiplyScalar(initialSpread))
    phys.leftBottom.rot.set(-0.6, 0.4, -0.5)

    // Right offsets to right
    phys.right.pos.copy(orig.right).add(new THREE.Vector3(2.0, 0.2, -0.6).multiplyScalar(initialSpread))
    phys.right.rot.set(0.5, -0.8, 0.6)

    // Left Top offsets to top-left
    phys.leftTop.pos.copy(orig.leftTop).add(new THREE.Vector3(-1.5, 1.6, -0.8).multiplyScalar(initialSpread))
    phys.leftTop.rot.set(0.4, 0.5, -0.4)
  }, [viewport.aspect])

  const getTargets = (p, time) => {
    const targets = {
      leftBottom: { pos: new THREE.Vector3(), rot: new THREE.Vector3(), opacity: 1 },
      right: { pos: new THREE.Vector3(), rot: new THREE.Vector3(), opacity: 1 },
      leftTop: { pos: new THREE.Vector3(), rot: new THREE.Vector3(), opacity: 1 },
      glow: 0
    }

    const olb = origPosRef.current.leftBottom
    const or = origPosRef.current.right
    const olt = origPosRef.current.leftTop

    const orlb = new THREE.Vector3(origRotRef.current.leftBottom.x, origRotRef.current.leftBottom.y, origRotRef.current.leftBottom.z)
    const orr = new THREE.Vector3(origRotRef.current.right.x, origRotRef.current.right.y, origRotRef.current.right.z)
    const orlt = new THREE.Vector3(origRotRef.current.leftTop.x, origRotRef.current.leftTop.y, origRotRef.current.leftTop.z)

    // Dynamic disassembly spread factor to prevent overflowing narrow viewports (mobile preview)
    const aspect = viewport.aspect
    const spreadFactor = aspect < 0.9 ? Math.max(0.45, aspect * 1.1) : 1.0

    // Disassembled positions
    const dlb = new THREE.Vector3().copy(olb).add(new THREE.Vector3(-1.8, -1.2, 0.8).multiplyScalar(spreadFactor))
    const dr = new THREE.Vector3().copy(or).add(new THREE.Vector3(2.0, 0.2, -0.6).multiplyScalar(spreadFactor))
    const dlt = new THREE.Vector3().copy(olt).add(new THREE.Vector3(-1.5, 1.6, -0.8).multiplyScalar(spreadFactor))

    // Disassembled rotations
    const drlb = new THREE.Vector3(-0.6, 0.4, -0.5)
    const drr = new THREE.Vector3(0.5, -0.8, 0.6)
    const drlt = new THREE.Vector3(0.4, 0.5, -0.4)

    // Drifting noise calculations
    const driftLB = new THREE.Vector3(Math.sin(time * 0.5) * 0.15, Math.cos(time * 0.6) * 0.15, Math.sin(time * 0.7) * 0.1)
    const driftR = new THREE.Vector3(Math.cos(time * 0.4) * 0.15, Math.sin(time * 0.5) * 0.15, Math.cos(time * 0.6) * 0.1)
    const driftLT = new THREE.Vector3(Math.sin(time * 0.6) * 0.15, Math.cos(time * 0.4) * 0.15, Math.sin(time * 0.5) * 0.1)

    const rotDriftLB = new THREE.Vector3(Math.sin(time * 0.3) * 0.2, Math.cos(time * 0.2) * 0.2, 0)
    const rotDriftR = new THREE.Vector3(Math.cos(time * 0.2) * 0.2, Math.sin(time * 0.3) * 0.2, 0)
    const rotDriftLT = new THREE.Vector3(Math.sin(time * 0.2) * 0.2, Math.cos(time * 0.3) * 0.2, 0)

    if (p < 25) {
      // Phase 1: Disassembled State (0% to 25% progress)
      targets.leftBottom.pos.copy(dlb).add(driftLB)
      targets.right.pos.copy(dr).add(driftR)
      targets.leftTop.pos.copy(dlt).add(driftLT)

      targets.leftBottom.rot.copy(drlb).add(rotDriftLB)
      targets.right.rot.copy(drr).add(rotDriftR)
      targets.leftTop.rot.copy(drlt).add(rotDriftLT)

      targets.leftBottom.opacity = 1
      targets.right.opacity = 1
      targets.leftTop.opacity = 1
    }
    else if (p < 55) {
      // Phase 2: Energy Buildup (25% to 55% progress)
      const t = (p - 25) / 30

      const curveLB = new THREE.Vector3().lerpVectors(dlb, olb, t)
      curveLB.y += Math.sin(t * Math.PI) * 0.3
      curveLB.x -= Math.sin(t * Math.PI) * 0.2
      targets.leftBottom.pos.copy(curveLB).add(driftLB.multiplyScalar(1 - t))

      const curveR = new THREE.Vector3().lerpVectors(dr, or, t)
      curveR.y -= Math.sin(t * Math.PI) * 0.2
      curveR.x += Math.sin(t * Math.PI) * 0.4
      targets.right.pos.copy(curveR).add(driftR.multiplyScalar(1 - t))

      const curveLT = new THREE.Vector3().lerpVectors(dlt, olt, t)
      curveLT.y += Math.sin(t * Math.PI) * 0.2
      curveLT.x -= Math.sin(t * Math.PI) * 0.3
      targets.leftTop.pos.copy(curveLT).add(driftLT.multiplyScalar(1 - t))

      targets.leftBottom.rot.lerpVectors(drlb, orlb, t)
      targets.right.rot.lerpVectors(drr, orr, t)
      targets.leftTop.rot.lerpVectors(drlt, orlt, t)

      targets.glow = t * 0.4
    }
    else if (p < 75) {
      // Phase 3: Logo Formation & Lock-in (55% to 75% progress)
      targets.leftBottom.pos.copy(olb)
      targets.right.pos.copy(or)
      targets.leftTop.pos.copy(olt)

      targets.leftBottom.rot.copy(orlb)
      targets.right.rot.copy(orr)
      targets.leftTop.rot.copy(orlt)

      // Bloom glow spikes right around lock (70% progress)
      const lockT = Math.max(0, 1 - Math.abs(p - 70) / 10)
      targets.glow = 1.6 * lockT + 0.3
    }
    else if (p < 90) {
      // Phase 4: Static Hero Moment (75% to 90% progress)
      const heroDrift = new THREE.Vector3(Math.sin(time * 0.8) * 0.06, Math.cos(time * 0.9) * 0.06, Math.sin(time * 0.7) * 0.04)
      targets.leftBottom.pos.copy(olb).add(heroDrift)
      targets.right.pos.copy(or).add(heroDrift)
      targets.leftTop.pos.copy(olt).add(heroDrift)

      targets.leftBottom.rot.copy(orlb)
      targets.right.rot.copy(orr)
      targets.leftTop.rot.copy(orlt)
      targets.glow = 0.3
    }
    else {
      // Phase 5: Disintegration (90% to 100% progress)
      const t = (p - 90) / 10

      targets.leftBottom.pos.lerpVectors(olb, dlb, t).add(driftLB.multiplyScalar(t))
      targets.right.pos.lerpVectors(or, dr, t).add(driftR.multiplyScalar(t))
      targets.leftTop.pos.lerpVectors(olt, dlt, t).add(driftLT.multiplyScalar(t))

      targets.leftBottom.rot.lerpVectors(orlb, drlb, t)
      targets.right.rot.lerpVectors(orr, drr, t)
      targets.leftTop.rot.lerpVectors(orlt, drlt, t)

      const opacity = 1 - t
      targets.leftBottom.opacity = opacity
      targets.right.opacity = opacity
      targets.leftTop.opacity = opacity
    }

    return targets
  }

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1)

    let p;
    if (autoRun) {
      // Sync progress: Stop incrementing at 89.9% so it holds the assembled position on the right side
      progressRef.current += dt * 11.76 * speedMultiplier;
      if (progressRef.current > 89.9) {
        progressRef.current = 89.9;
      }
      p = progressRef.current;
    } else {
      p = progress;
    }

    if (onProgressUpdate) {
      onProgressUpdate(p)
    }

    const time = state.clock.getElapsedTime()
    const targets = getTargets(p, time)

    // Set custom spring physics parameters
    let tension = 15
    let friction = 4
    if (p >= 55 && p < 75) {
      tension = 130  // High tension for snap-to-lock assembly
      friction = 13   // Friction to manage overshoot and settle
    } else if (p >= 75 && p < 90) {
      tension = 60
      friction = 14
    }

    const applySpring = (current, target, vel, rotCurrent, rotTarget, rotVel) => {
      // Position spring simulation
      const dispX = target.x - current.x
      const forceX = dispX * tension - vel.x * friction
      vel.x += forceX * dt
      current.x += vel.x * dt

      const dispY = target.y - current.y
      const forceY = dispY * tension - vel.y * friction
      vel.y += forceY * dt
      current.y += vel.y * dt

      const dispZ = target.z - current.z
      const forceZ = dispZ * tension - vel.z * friction
      vel.z += forceZ * dt
      current.z += vel.z * dt

      // Rotation spring simulation
      const rotTension = tension * 0.4
      const rotFriction = friction * 1.1

      const rDispX = rotTarget.x - rotCurrent.x
      const rForceX = rDispX * rotTension - rotVel.x * rotFriction
      rotVel.x += rForceX * dt
      rotCurrent.x += rotVel.x * dt

      const rDispY = rotTarget.y - rotCurrent.y
      const rForceY = rDispY * rotTension - rotVel.y * rotFriction
      rotVel.y += rForceY * dt
      rotCurrent.y += rotVel.y * dt

      const rDispZ = rotTarget.z - rotCurrent.z
      const rForceZ = rDispZ * rotTension - rotVel.z * rotFriction
      rotVel.z += rForceZ * dt
      rotCurrent.z += rotVel.z * dt
    }

    const phys = physicsRef.current

    // Animate individual pieces with physics
    if (meshLeftBottomRef.current) {
      const mesh = meshLeftBottomRef.current
      applySpring(mesh.position, targets.leftBottom.pos, phys.leftBottom.vel, mesh.rotation, targets.leftBottom.rot, phys.leftBottom.rotVel)
      if (mesh.material) {
        mesh.material.opacity = targets.leftBottom.opacity
      }
    }

    if (meshRightRef.current) {
      const mesh = meshRightRef.current
      applySpring(mesh.position, targets.right.pos, phys.right.vel, mesh.rotation, targets.right.rot, phys.right.rotVel)
      if (mesh.material) {
        mesh.material.opacity = targets.right.opacity
        mesh.material.emissive.set('#ffffff')
        mesh.material.emissiveIntensity = targets.glow
      }
    }

    if (meshLeftTopRef.current) {
      const mesh = meshLeftTopRef.current
      applySpring(mesh.position, targets.leftTop.pos, phys.leftTop.vel, mesh.rotation, targets.leftTop.rot, phys.leftTop.rotVel)
      if (mesh.material) {
        mesh.material.opacity = targets.leftTop.opacity
      }
    }

    // Set emissive light source intensity based on white element glow
    if (pointLightRef.current) {
      pointLightRef.current.intensity = targets.glow * 4.0
    }

    // Responsive scale logic to prevent overflowing on mobile (portrait aspect ratios)
    const aspect = viewport.aspect
    const scaleFactor = aspect < 1.0 ? (0.55 + 0.45 * aspect) : 1.0

    // Snappy scale impact pulse at docking moment (around p = 70)
    let targetScale = 1.25 * scaleFactor
    if (p >= 69 && p < 72) {
      targetScale = 1.35 * scaleFactor
    }

    if (groupRef.current) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.15)
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.15)
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.15)

      // Tiny mouse/touch reactive parallax
      const targetRotX = (hasHoverRef.current || isPointerDownRef.current) ? mouse.y * 0.90 : 0
      const targetRotY = (hasHoverRef.current || isPointerDownRef.current) ? mouse.x * 0.95 : 0

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06)
    }

    // Camera dolly effect (slow motion over time)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5.0 - Math.sin(time * 0.3) * 0.1, 0.05)
  })

  return (
    <Float speed={1.0} rotationIntensity={0.02} floatIntensity={0.15}>
      <group ref={groupRef}>
        {/* Left Bottom Mesh (mesh_id26) */}
        <mesh
          ref={meshLeftBottomRef}
          position={[-1.8046588974073529, -1.673944365978241, 1.0]}
          rotation={[-0.6, 0.4, -0.5]}
          scale={[1.543049931526184, 1.3201112747192383, 0.771524965763092]}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[LOGO_GEOMETRIES.mesh_0.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-normal"
              args={[LOGO_GEOMETRIES.mesh_0.normals, 3]}
            />
            <bufferAttribute
              attach="index"
              args={[LOGO_GEOMETRIES.mesh_0.indices, 1]}
            />
          </bufferGeometry>
          <meshStandardMaterial
            color="#000000"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={1}
          />
        </mesh>

        {/* Right Mesh (mesh_id27) */}
        <mesh
          ref={meshRightRef}
          position={[2.4637259244918823, 0.21548828184604645, -0.4]}
          rotation={[0.5, -0.8, 0.6]}
          scale={[0.6141150593757629, 1.1812922954559326, 0.5906461477279663]}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[LOGO_GEOMETRIES.mesh_1.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-normal"
              args={[LOGO_GEOMETRIES.mesh_1.normals, 3]}
            />
            <bufferAttribute
              attach="index"
              args={[LOGO_GEOMETRIES.mesh_1.indices, 1]}
            />
          </bufferGeometry>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={1}
          />
        </mesh>

        {/* Left Top Mesh (mesh_id28) */}
        <mesh
          ref={meshLeftTopRef}
          position={[-1.5021716081537306, 2.204931652545929, -0.6]}
          rotation={[0.4, 0.5, -0.4]}
          scale={[1.5423771142959595, 0.9763968586921692, 0.7711885571479797]}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[LOGO_GEOMETRIES.mesh_2.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-normal"
              args={[LOGO_GEOMETRIES.mesh_2.normals, 3]}
            />
            <bufferAttribute
              attach="index"
              args={[LOGO_GEOMETRIES.mesh_2.indices, 1]}
            />
          </bufferGeometry>
          <meshStandardMaterial
            color="#000000"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={1}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function Scene3D({ onProgressUpdate, autoRun = true, speedMultiplier = 1, progress = 0 }) {
  const pointLightRef = useRef()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.1} />

      {/* Volumetric Rim Lights */}
      <directionalLight position={[5, 5, 5]} intensity={1.8} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <directionalLight position={[0, -5, 5]} intensity={0.2} />

      {/* Volumetric dynamic point light emitting from the center (white element glow) */}
      <pointLight ref={pointLightRef} position={[0.2, 0, 0.3]} color="#ffffff" distance={5} decay={1.5} />

      <Suspense fallback={null}>
        <Model 
          onProgressUpdate={onProgressUpdate} 
          pointLightRef={pointLightRef} 
          autoRun={autoRun}
          speedMultiplier={speedMultiplier}
          progress={progress}
        />
        <FloatingParticles count={isMobile ? 35 : 65} />
      </Suspense>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.2}
        scale={6}
        blur={2.5}
        color="#000000"
        resolution={isMobile ? 256 : 512}
      />
    </Canvas>
  )
}
