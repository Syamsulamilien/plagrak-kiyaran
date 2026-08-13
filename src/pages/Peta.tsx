import { Building2, Landmark, MapPin, School, ShieldCheck } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import FadeIn from "../components/ui/FadeIn";

const lokasiPenting = [
  { nama: "Balai Pedukuhan Plagrak Kiyaran", icon: Landmark, ket: "Pusat pelayanan dan kegiatan warga" },
  { nama: "Masjid Pedukuhan", icon: Building2, ket: "Pusat kegiatan keagamaan warga" },
  { nama: "SD/SMP Terdekat", icon: School, ket: "Fasilitas pendidikan yang menjangkau dusun" },
  { nama: "Pos Kamling", icon: ShieldCheck, ket: "Titik ronda dan keamanan lingkungan" },
];

export default function Peta() {
  return (
    <>
      <PageHero eyebrow="Lokasi" title="Peta Wilayah" description="Letak Pedukuhan Plagrak Kiyaran beserta titik-titik penting di dalamnya." breadcrumb="Peta" />

      <section className="py-16 sm:py-24">
        <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FadeIn className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl shadow-soft aspect-[4/3] sm:aspect-video">
              <iframe
                title="Peta Pedukuhan Plagrak Kiyaran"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.260589525908!2d110.43805289999999!3d-7.655105099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5ddb353c65a5%3A0xd08519c54d38f36d!2sMushola%20Darul%20Huda%20Plagrak!5e0!3m2!1sen!2sid!4v1786503117999!5m2!1sen!2sid"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-xs text-dusk-700/45 italic">*Titik peta menunjukkan lokasi presisi di sekitar Mushola Darul Huda Plagrak.</p>
          </FadeIn>

          <div className="lg:col-span-4">
            <p className="font-display font-semibold text-dusk-800 mb-4">Lokasi Penting</p>
            <div className="space-y-3">
              {lokasiPenting.map((l) => (
                <FadeIn key={l.nama} className="flex gap-3 card-surface p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><l.icon className="h-5 w-5" /></span>
                  <div><p className="text-sm font-semibold text-dusk-800">{l.nama}</p><p className="text-xs text-dusk-700/55 mt-0.5">{l.ket}</p></div>
                </FadeIn>
              ))}
              <FadeIn className="flex gap-3 card-surface p-4 bg-mist">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700"><MapPin className="h-5 w-5" /></span>
                <div><p className="text-sm font-semibold text-dusk-800">Sawah Terasering & Titik Pandang Merapi</p><p className="text-xs text-dusk-700/55 mt-0.5">Area persawahan dan spot pemandangan lereng Merapi</p></div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
