export default function Logo({ className = "w-8 h-8", inverted = false }) {
  // Theme coloring mapping using CSS variables for dynamic Color Mode transitions
  const primaryFill = inverted ? "#ffffff" : "var(--sys-logo-color-1)";
  const primaryStroke = inverted ? "#ffffff" : "var(--sys-logo-color-1)";
  const accentFill = inverted ? "#000000" : "var(--sys-logo-color-2)";
  const accentStroke = inverted ? "#ffffff" : "var(--sys-logo-color-3)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      fill="none"
      className={`${className} select-none`}
    >
      {/* Left Bottom Mesh (mesh_0) */}
      <path
        d="M 118.68,279.50 L 118.03,214.76 L 381.31,424.32 L 298.56,423.65 L 201.12,345.90 L 118.35,440.00 L 118.68,354.91 L 158.07,311.19 Z"
        fill={primaryFill}
        stroke={primaryStroke}
        strokeWidth="14"
        strokeLinejoin="miter"
      />
      {/* Right Mesh (mesh_1) */}
      <path
        d="M 381.97,143.09 L 381.97,229.18 L 360.62,253.55 L 381.31,269.90 L 381.65,344.65 L 277.19,261.22 Z"
        fill={accentFill}
        stroke={accentStroke}
        strokeWidth="14"
        strokeLinejoin="miter"
      />
      {/* Left Top Mesh (mesh_2) */}
      <path
        d="M 234.03,226.60 L 118.76,133.57 L 118.51,60.51 L 227.72,147.72 L 305.84,60.00 L 381.67,60.00 Z"
        fill={primaryFill}
        stroke={primaryStroke}
        strokeWidth="14"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
