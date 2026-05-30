import { useState, useEffect } from "react";

export default function BrutalistCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const isSmall = window.innerWidth <= 768;
      setIsMobile(isSmall);
    };

    // Always listen to resize
    window.addEventListener("resize", checkDevice);

    // Initial check
    checkDevice();

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (isMobile) {
      document.body.style.cursor = "";
      return () => {
        window.removeEventListener("resize", checkDevice);
      };
    }

    document.body.style.cursor = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.6 : 1.0})`,
      }}
    >
      <div 
        className="w-6 h-6 border-2 border-white bg-white"
        style={{
          borderRadius: "0px", // strictly flat corners
          transition: "width 0.15s, height 0.15s",
        }}
      />
    </div>
  );
}
