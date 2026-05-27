import { useRef } from 'react'
import Scene3D from './components/Scene3D'

export default function App() {
  const canvasContainerRef = useRef(null)

  const handleProgressUpdate = (p) => {
    let translateX = 0
    let translateY = 0

    const isLandscape = typeof window !== 'undefined' && window.innerWidth > window.innerHeight
    const shiftX = isLandscape ? (window.innerWidth > 1024 ? 680 : window.innerWidth * 0.28) : 0
    const shiftY = !isLandscape ? Math.min(250, window.innerHeight * 0.28) : 0

    if (p >= 70 && p < 78) {
      // Shake phase: Logo completed loading, now shakes rapidly
      translateX = (Math.random() - 0.5) * 8 // 8px shake intensity
      translateY = (Math.random() - 0.5) * 8
    } else if (p >= 78 && p < 89.9) {
      // Slide phase: Logo smoothly slides
      const t = (p - 78) / 11.9 // normalize to 0..1 range
      const easedT = t * t * (3 - 2 * t) // smoothstep easing
      translateX = easedT * shiftX
      translateY = easedT * shiftY
    } else if (p >= 89.9) {
      // Hold position
      translateX = shiftX
      translateY = shiftY
    }

    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
    }
  }

  return (
    <div className="relative w-screen h-screen bg-transparent backdrop-blur-[20px] flex flex-col items-center justify-center overflow-hidden selection:bg-black/10 selection:text-black">
      {/* Volumetric atmosphere background */}
      <div className="absolute inset-0 bg-[#f9f9f9]/35 backdrop-blur-[20px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-black/[0.01] blur-[150px] pointer-events-none" />

      {/* Fullscreen transparent WebGL canvas wrapper */}
      <div
        ref={canvasContainerRef}
        className="w-full h-full"
      >
        <Scene3D onProgressUpdate={handleProgressUpdate} />
      </div>
    </div>
  )
}
