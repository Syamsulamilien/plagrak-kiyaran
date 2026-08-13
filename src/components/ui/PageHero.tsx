import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ContourDivider from "./ContourDivider";

export default function PageHero({ eyebrow, title, description, breadcrumb }: { eyebrow: string; title: string; description?: string; breadcrumb: string }) {
  return (
    <section className="relative bg-primary-800 pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-600/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-site relative">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-primary-200/70">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="h-3.5 w-3.5" /> Beranda
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/85">{breadcrumb}</span>
        </nav>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="badge-eyebrow text-gold-300 mt-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            {eyebrow}
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-display font-bold text-white">{title}</h1>
          {description && <p className="mt-4 max-w-xl text-primary-50/75 leading-relaxed">{description}</p>}
        </motion.div>
      </div>
      <ContourDivider tone="light" className="absolute -bottom-4 sm:-bottom-8 opacity-80" />
    </section>
  );
}
