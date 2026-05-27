import React from "react";

export default function Marquee({
  text = "XEROX TECH // RAW CODE // BRUTALIST FRAMEWORK // HIGH PERFORMANCE // ",
  speed = 20,
  bgClass = "bg-primary text-on-secondary",
  fontSizeClass = "font-display text-headline-md font-black uppercase italic py-4",
  reverse = false,
}) {
  // Repeat the text string so it occupies enough width to loop seamlessly
  const repeatedText = `${text} ${text} ${text} ${text}`;

  return (
    <div className={`w-full overflow-hidden border-b-thick border-primary select-none flex ${bgClass}`}>
      <div 
        className="flex whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        <div
          className={`inline-block ${fontSizeClass}`}
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            paddingRight: "2rem"
          }}
        >
          {repeatedText}
        </div>
        <div
          className={`inline-block ${fontSizeClass}`}
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            paddingRight: "2rem"
          }}
          aria-hidden="true"
        >
          {repeatedText}
        </div>
      </div>

      {/* Injecting dynamic CSS for the keyframe animation directly inline to keep it self-contained */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
