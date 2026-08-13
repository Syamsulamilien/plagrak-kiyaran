import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function MountainScene() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const range = prefersReduced ? [0, 0] : undefined;
  const yBack = useTransform(scrollY, [0, 700], range ?? [0, 26]);
  const yMid = useTransform(scrollY, [0, 700], range ?? [0, 64]);
  const yFront = useTransform(scrollY, [0, 700], range ?? [0, 118]);

  return (
    <motion.svg
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={mounted ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCE9E4" />
          <stop offset="52%" stopColor="#F0F3F1" />
          <stop offset="100%" stopColor="#FBF1DC" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="66%" cy="20%" r="42%">
          <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
        <clipPath id="frontClip">
          <path d="M0,650 C150,600 300,645 450,605 C620,560 780,620 960,590 C1120,565 1300,610 1440,585 L1440,800 L0,800 Z" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="1440" height="800" fill="url(#skyGradient)" />
      <rect x="0" y="0" width="1440" height="800" fill="url(#sunGlow)" />

      <g className="animate-drift-slower" opacity="0.5">
        <ellipse cx="1010" cy="140" rx="60" ry="16" fill="#FFFFFF" />
        <ellipse cx="1060" cy="120" rx="42" ry="12" fill="#FFFFFF" />
      </g>

      <g fill="none" stroke="#5B6B62" strokeWidth="3" strokeLinecap="round" opacity="0.4">
        <path d="M180,120 q14,-14 28,0 q14,-14 28,0" />
        <path d="M330,90 q11,-11 22,0 q11,-11 22,0" />
      </g>

      <motion.g style={{ y: yBack }}>
        <path d="M650,560 C700,460 780,320 850,250 C880,215 915,195 950,185 C985,197 1020,222 1055,265 C1130,350 1210,455 1270,560 Z" fill="#9FB6AA" />
        <path d="M850,250 C880,215 915,195 950,185 C935,215 918,255 905,300 Z" fill="#B4C8BD" opacity="0.6" />
      </motion.g>

      <motion.g style={{ y: yMid }}>
        <path d="M0,560 C120,500 250,540 380,510 C520,478 620,530 760,500 C900,470 1020,520 1160,495 C1280,475 1360,510 1440,495 L1440,800 L0,800 Z" fill="#5C9F60" />
        <path d="M0,560 C120,500 250,540 380,510 C520,478 620,530 760,500 C900,470 1020,520 1160,495 C1280,475 1360,510 1440,495" fill="none" stroke="#4A8A4E" strokeWidth="2" opacity="0.5" />
      </motion.g>

      <motion.g style={{ y: yFront }}>
        <g clipPath="url(#frontClip)">
          <rect x="0" y="560" width="1440" height="240" fill="#20552A" />
          <path d="M0,660 C150,615 300,655 450,618 C620,578 780,632 960,602 C1120,580 1300,622 1440,598" fill="none" stroke="#EAF4EA" strokeWidth="1.5" opacity="0.16" />
          <path d="M0,695 C150,650 300,690 450,653 C620,613 780,667 960,637 C1120,615 1300,657 1440,633" fill="none" stroke="#EAF4EA" strokeWidth="1.5" opacity="0.16" />
          <path d="M0,730 C150,685 300,725 450,688 C620,648 780,702 960,672 C1120,650 1300,692 1440,668" fill="none" stroke="#EAF4EA" strokeWidth="1.5" opacity="0.14" />
          <path d="M0,765 C150,720 300,760 450,723 C620,683 780,737 960,707 C1120,685 1300,727 1440,703" fill="none" stroke="#EAF4EA" strokeWidth="1.5" opacity="0.12" />
        </g>
        <g fill="#152E19">
          <g transform="translate(220,690)"><circle cx="0" cy="-18" r="14" /><rect x="-2.5" y="-4" width="5" height="16" /></g>
          <g transform="translate(1230,705) scale(0.85)"><circle cx="0" cy="-18" r="14" /><rect x="-2.5" y="-4" width="5" height="16" /></g>
          <g transform="translate(1290,695) scale(0.6)"><circle cx="0" cy="-18" r="14" /><rect x="-2.5" y="-4" width="5" height="16" /></g>
        </g>
      </motion.g>
    </motion.svg>
  );
}
