import React, { useRef, useState, useEffect } from "react";
import Scene3D from "./Scene3D";

export default function LoadingScreen({ onComplete, speedMultiplier = 1.0 }) {
  const canvasContainerRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  const handleProgressUpdate = (p) => {
    let translateX = 0;
    let translateY = 0;

    const isLandscape = typeof window !== "undefined" && window.innerWidth > window.innerHeight;
    const shiftX = isLandscape ? (window.innerWidth > 1024 ? 680 : window.innerWidth * 0.28) : 0;
    const shiftY = !isLandscape ? Math.min(250, window.innerHeight * 0.28) : 0;

    if (p >= 70 && p < 78) {
      // Shake phase: Logo completed loading, now shakes rapidly
      translateX = (Math.random() - 0.5) * 8; // 8px shake intensity
      translateY = (Math.random() - 0.5) * 8;
    } else if (p >= 78 && p < 89.9) {
      // Slide phase: Logo smoothly slides
      const t = (p - 78) / 11.9; // normalize to 0..1 range
      const easedT = t * t * (3 - 2 * t); // smoothstep easing
      translateX = easedT * shiftX;
      translateY = easedT * shiftY;
    } else if (p >= 89.9) {
      // Hold position
      translateX = shiftX;
      translateY = shiftY;

      // Trigger completion callback exactly once when reaching assembly cap
      if (!isDone) {
        setIsDone(true);
        if (onComplete) {
          onComplete();
        }
      }
    }

    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#f9f9f9]/90 backdrop-blur-[20px] flex flex-col items-center justify-center overflow-hidden pointer-events-auto">
      {/* Volumetric atmospheric background overlays */}
      <div className="absolute inset-0 bg-[#f9f9f9]/35 backdrop-blur-[20px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-black/[0.01] blur-[150px] pointer-events-none" />

      {/* Screen Loader Tech readouts (Brutalist aesthetic match) */}
      <div className="absolute top-10 left-10 z-10 font-mono text-[10px] text-primary uppercase select-none tracking-widest leading-relaxed">
        &gt; CODESPACE INITIALIZATION PROTOCOL
        <br />
        &gt; SECURE SHELL COORDINATE: 52.52° N
      </div>

      <div className="absolute bottom-10 right-10 z-10 font-mono text-[9px] text-secondary uppercase select-none tracking-widest font-bold">
        XEROX ENGINE // LOADING
      </div>

      {/* Fullscreen transparent WebGL canvas wrapper */}
      <div
        ref={canvasContainerRef}
        className="w-full h-full transition-transform duration-75"
      >
        <Scene3D onProgressUpdate={handleProgressUpdate} autoRun={true} speedMultiplier={speedMultiplier} />
      </div>
    </div>
  );
}
