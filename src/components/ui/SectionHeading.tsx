import FadeIn from "./FadeIn";

export default function SectionHeading({ eyebrow, title, description, align = "left", tone = "light", className = "" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center"; tone?: "light" | "dark"; className?: string }) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""} ${className}`}>
      <FadeIn>
        <span className={`badge-eyebrow ${tone === "dark" ? "text-primary-300" : "text-primary-700"}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          {eyebrow}
        </span>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h2 className={`mt-3 text-3xl sm:text-4xl font-bold leading-tight ${tone === "dark" ? "text-white" : "text-dusk-800"}`}>{title}</h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.16}>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${tone === "dark" ? "text-white/75" : "text-dusk-700/75"}`}>{description}</p>
        </FadeIn>
      )}
    </div>
  );
}
