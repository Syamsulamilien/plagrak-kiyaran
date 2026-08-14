import { Landmark, Phone } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import Button from "../ui/Button";

export default function CtaBanner() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-site">
        <FadeIn>
          <div className="relative overflow-hidden rounded-4xl bg-primary-700 px-6 py-14 sm:px-16 sm:py-20 text-center">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary-600/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="relative">
            <span className="badge-eyebrow text-white justify-center"><Landmark className="h-3.5 w-3.5 text-gold-300" />Kenali Lebih Dekat</span>              <h2 className="mt-4 text-2xl sm:text-4xl font-display font-bold text-white max-w-2xl mx-auto leading-tight">Ingin tahu lebih banyak tentang Plagrak Kiyaran?</h2>
              <p className="mt-4 text-primary-50/80 max-w-lg mx-auto leading-relaxed">Simak sejarah, visi misi, dan geliat warga dusun kami — atau langsung hubungi perangkat pedukuhan.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button to="/tentang" variant="secondary" size="lg" icon>Tentang Pedukuhan</Button>
                <Button to="/kontak" variant="ghost" size="lg"><Phone className="h-4 w-4" />Hubungi Kami</Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
