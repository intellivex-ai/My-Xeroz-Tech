import { useRef, useState, useCallback } from "react";
import Scene3D from "./Scene3D";

export default function LoadingScreen({ onComplete, speedMultiplier = 1.0, pathname = "/" }) {
  const canvasContainerRef = useRef(null);
  const [isDone, setIsDone] = useState(false);
  const [scaleMult, setScaleMult] = useState(1.0);
  const onCompleteRef = useRef(onComplete);
  const pathnameRef = useRef(pathname);
  onCompleteRef.current = onComplete;
  pathnameRef.current = pathname;

  const doneRef = useRef(false);

  const handleProgressUpdate = useCallback((p) => {
    let translateX = 0;
    let translateY = 0;

    let shiftX = 0;
    let shiftY = 0;
    let targetScaleMult = 1.0;

    const isHomePage = pathnameRef.current === "/";
    const heroContainer = isHomePage ? document.getElementById("hero-3d-container") : null;

    if (heroContainer) {
      const rect = heroContainer.getBoundingClientRect();
      shiftX = (rect.left + rect.width / 2) - (window.innerWidth / 2);
      shiftY = (rect.top + rect.height / 2) - (window.innerHeight / 2);

      const heroAspect = rect.width / rect.height;
      const scaleFactor_hero = heroAspect < 1.0 ? (0.55 + 0.45 * heroAspect) : 1.0;

      const loadingAspect = window.innerWidth / window.innerHeight;
      const scaleFactor_loading = loadingAspect < 1.0 ? (0.55 + 0.45 * loadingAspect) : 1.0;

      targetScaleMult = (scaleFactor_hero / scaleFactor_loading) * (rect.height / window.innerHeight);
    } else {
      shiftX = 0;
      shiftY = 0;
      targetScaleMult = 1.0;
    }

    if (p < 78) {
      setScaleMult(1.0);
    }

    if (p >= 70 && p < 78) {
      const decay = 1 - (p - 70) / 8;
      translateX = (Math.random() - 0.5) * 8 * decay;
      translateY = (Math.random() - 0.5) * 8 * decay;
    } else if (p >= 78 && p < 89.9) {
      const t = (p - 78) / 11.9;
      const easedT = t * t * (3 - 2 * t);
      translateX = easedT * shiftX;
      translateY = easedT * shiftY;

      const currentScaleMult = 1.0 + (targetScaleMult - 1.0) * easedT;
      setScaleMult(currentScaleMult);
    } else if (p >= 89.9) {
      translateX = shiftX;
      translateY = shiftY;
      setScaleMult(targetScaleMult);

      if (!doneRef.current) {
        doneRef.current = true;
        setIsDone(true);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }

    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }
  }, []);

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden loading-screen ${
        isDone 
          ? "opacity-0 pointer-events-none backdrop-blur-none scale-[0.98]" 
          : "opacity-100 pointer-events-auto backdrop-blur-[20px] scale-100"
      }`}
      style={{
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {/* Technical Industrial Dot Grid */}
      <div 
        className="absolute inset-0 w-full h-full bg-surface-container opacity-60" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      {/* Screen Loader Tech readouts (Brutalist aesthetic match) */}
      <div className="absolute top-10 left-10 z-10 font-mono text-[10px] text-primary uppercase select-none tracking-widest leading-relaxed">
        &gt; CODESPACE INITIALIZATION PROTOCOL
        <br />
        &gt; SECURE SHELL COORDINATE: 52.52° N
      </div>

      <div className="absolute bottom-10 right-10 z-10 font-mono text-[9px] text-secondary uppercase select-none tracking-widest font-bold">
        MY XEROZ ENGINE // LOADING
      </div>

      {/* Fullscreen transparent WebGL canvas wrapper */}
      <div
        ref={canvasContainerRef}
        className="w-full h-full transition-transform duration-75"
      >
        <Scene3D onProgressUpdate={handleProgressUpdate} autoRun={true} speedMultiplier={speedMultiplier} scaleMultiplier={scaleMult} />
      </div>
    </div>
  );
}
