export default function ContourDivider({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const stroke = tone === "light" ? "#2E7D32" : "#EAF4EA";
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full h-6 sm:h-10">
        <path d="M0,26 C100,6 200,46 300,26 C400,6 500,46 600,26 C700,6 800,46 900,26 C1000,6 1100,46 1200,26" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.35" />
        <path d="M0,34 C120,18 220,50 340,34 C460,18 560,50 680,34 C800,18 900,50 1020,34 C1120,18 1200,42 1200,34" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.2" />
      </svg>
    </div>
  );
}
