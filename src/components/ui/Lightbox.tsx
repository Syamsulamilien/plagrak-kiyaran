import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GaleriItem } from "../../types";

interface LightboxProps {
  items: GaleriItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && activeIndex !== null) onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft" && activeIndex !== null) onNavigate((activeIndex - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-dusk/92 backdrop-blur-sm p-4 sm:p-8" onClick={onClose}>
          <button onClick={onClose} className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Tutup">
            <X className="h-5 w-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNavigate((activeIndex! - 1 + items.length) % items.length); }} className="absolute left-3 sm:left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Sebelumnya">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNavigate((activeIndex! + 1) % items.length); }} className="absolute right-3 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Berikutnya">
            <ChevronRight className="h-5 w-5" />
          </button>
          <motion.figure key={item.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }} className="max-h-[85vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img src={item.gambar_url} alt={item.judul} className="max-h-[75vh] w-auto rounded-2xl object-contain mx-auto" />
            <figcaption className="mt-4 text-center text-white/85 text-sm">
              <span className="badge-eyebrow text-gold-300 justify-center">{item.kategori}</span>
              <p className="mt-1.5 font-medium">{item.judul}</p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
