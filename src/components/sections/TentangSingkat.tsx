import { Compass, Mountain, Sprout, Users } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const poin = [
  { icon: Mountain, text: "Berada di lereng selatan Gunung Merapi, Kalurahan Wukirsari" },
  { icon: Sprout, text: "Ekonomi warga bertumpu pada pertanian, terutama sawah " },
  { icon: Users, text: "Kehidupan bermasyarakat yang masih kental dengan gotong royong" },
];

export default function TentangSingkat() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Selayang Pandang" title="Mengenal Plagrak Kiyaran" description="Dusun asri di kaki Gunung Merapi, tempat sawah berundak dan keramahan warga menyatu dalam keseharian yang sederhana namun produktif." />
          <FadeIn delay={0.1} className="mt-7 space-y-4">
            {poin.map((p) => (
              <div key={p.text} className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><p.icon className="h-4.5 w-4.5" /></span>
                <p className="text-sm sm:text-base text-dusk-700/75 leading-relaxed pt-1.5">{p.text}</p>
              </div>
            ))}
          </FadeIn>
          <FadeIn delay={0.2}>
            <Button to="/tentang" variant="secondary" icon className="mt-8"><Compass className="h-4 w-4" />Selengkapnya Tentang Kami</Button>
          </FadeIn>
        </div>
        <FadeIn delay={0.15} className="lg:col-span-6">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-4xl card-surface">
              <img src="images/plagrak006.jpeg" alt="Suasana Pedukuhan Plagrak Kiyaran" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block card-surface px-5 py-4 max-w-[220px]">
              <p className="text-2xl font-display font-bold text-primary-700">±500 mdpl</p>
              <p className="text-xs text-dusk-700/60 mt-0.5">Ketinggian wilayah di lereng Merapi</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
