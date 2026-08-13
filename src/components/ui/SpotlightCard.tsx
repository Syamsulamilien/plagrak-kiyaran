import { useRef, useState, type MouseEvent, type ReactNode } from "react";

export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(46, 125, 50, 0.14)" }: { children: ReactNode; className?: string; spotlightColor?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setOpacity(1)} onMouseLeave={() => setOpacity(0)} className={`group relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500" style={{ opacity, background: `radial-gradient(360px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)` }} />
      {children}
    </div>
  );
}
