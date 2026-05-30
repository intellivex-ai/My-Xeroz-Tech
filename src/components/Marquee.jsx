export default function Marquee({
  text = "MY XEROZ TECH // RAW CODE // BRUTALIST FRAMEWORK // HIGH PERFORMANCE // ",
  speed = 20,
  bgClass = "bg-primary text-on-secondary",
  fontSizeClass = "font-display text-headline-md font-black uppercase italic py-4",
  reverse = false,
}) {
  const repeatedText = `${text} ${text} ${text} ${text}`;

  return (
    <div className={`w-full overflow-hidden border-b-thick border-primary select-none flex ${bgClass} group`}>
      <div
        className="flex whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        <div
          className={`inline-block ${fontSizeClass}`}
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            paddingRight: "2rem",
            animationPlayState: "running",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
        >
          {repeatedText}
        </div>
        <div
          className={`inline-block ${fontSizeClass}`}
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            paddingRight: "2rem",
            animationPlayState: "running",
          }}
          aria-hidden="true"
          onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
        >
          {repeatedText}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
