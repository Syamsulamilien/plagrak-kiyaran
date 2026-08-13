import { motion } from "framer-motion";
import { ChevronDown, Compass, Sprout } from "lucide-react";
import AnimatedHeading from "../ui/AnimatedHeading";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-dusk">
      <img
        src="/images/homeplagrak.jpeg"
        alt="Pemandangan Pedukuhan Plagrak Kiyaran"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dusk/80 via-dusk/10 to-transparent" />
      <div className="container-site relative z-10 flex h-full flex-col items-start justify-center pt-16">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="badge-eyebrow text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full">
          <Sprout className="h-3.5 w-3.5 text-gold-300" />
          Lereng Selatan Gunung Merapi
        </motion.span>

        <h1 className="mt-5 max-w-3xl">
          <AnimatedHeading text="Selamat Datang di Website Resmi" as="h1" className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90" delay={0.35} />
          <AnimatedHeading text="Pedukuhan Plagrak Kiyaran" as="h1" className="mt-1 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]" textClassName="text-gradient-harvest" delay={0.75} />
        </h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.6 }} className="mt-6 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed">
          Dusun asri di Kalurahan Wukirsari, Kapanewon Cangkringan — tempat sawah terasering, kebun salak, dan keramahan warga berpadu di kaki Gunung Merapi.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 0.6 }} className="mt-9 flex flex-wrap items-center gap-3">
          <Button to="/tentang" size="lg" icon>Jelajahi Pedukuhan</Button>
          <Button to="/potensi" variant="ghost" size="lg"><Compass className="h-4 w-4" />Lihat Potensi</Button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }} className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/60">
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
