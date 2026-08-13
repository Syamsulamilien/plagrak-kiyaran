import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { FadeInStagger, FadeInStaggerItem } from "../ui/FadeIn";
import SpotlightCard from "../ui/SpotlightCard";
import Button from "../ui/Button";
import { supabase } from "../../lib/supabase";
import type { Potensi } from "../../types";

export default function PotensiPreview() {
  const [data, setData] = useState<Potensi[]>([]);

  useEffect(() => {
    supabase.from("potensi").select("*").limit(3).then(({ data }) => setData(data ?? []));
  }, []);

  if (data.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-mist">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading eyebrow="Kekayaan Dusun" title="Potensi Unggulan" description="Pertanian dan peternakan yang menjadi tumpuan ekonomi warga Plagrak Kiyaran." />
          <Button to="/potensi" variant="secondary" icon className="shrink-0">Lihat Semua Potensi</Button>
        </div>
        <FadeInStagger className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-7">
          {data.map((p) => (
            <FadeInStaggerItem key={p.id}>
              <SpotlightCard className="card-surface h-full">
                <Link to="/potensi" className="block h-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-earth-50">
                    {p.gambar_url && <img src={p.gambar_url} alt={p.nama} loading="lazy" className="h-full w-full object-cover" />}
                    <span className="absolute top-3 left-3 rounded-full bg-primary-700/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">{p.kategori}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-dusk-800">{p.nama}</h3>
                    <p className="mt-2 text-sm text-dusk-700/65 leading-relaxed line-clamp-2">{p.deskripsi}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-primary-700 font-medium"><MapPin className="h-3.5 w-3.5" /> {p.lokasi}</p>
                  </div>
                </Link>
              </SpotlightCard>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}