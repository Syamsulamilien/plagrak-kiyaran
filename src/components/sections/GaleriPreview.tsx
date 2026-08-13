import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { FadeInStagger, FadeInStaggerItem } from "../ui/FadeIn";
import Button from "../ui/Button";
import { supabase } from "../../lib/supabase";
import type { GaleriItem } from "../../types";

export default function GaleriPreview() {
  const [foto, setFoto] = useState<GaleriItem[]>([]);

  useEffect(() => {
    supabase
      .from("galeri")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => setFoto(data ?? []));
  }, []);

  if (foto.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading eyebrow="Sekilas Dokumentasi" title="Galeri Pedukuhan" description="Momen keseharian, gotong royong, dan budaya warga Plagrak Kiyaran." />
          <Button to="/galeri" variant="secondary" icon className="shrink-0"><Images className="h-4 w-4" />Lihat Galeri Lengkap</Button>
        </div>
        <FadeInStagger className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 auto-rows-[130px] sm:auto-rows-[160px]">
          {foto.map((f, i) => (
            <FadeInStaggerItem key={f.id} className={`${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <Link to="/galeri" className="group block h-full w-full overflow-hidden rounded-3xl relative">
                <img src={f.gambar_url} alt={f.judul} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-dusk/70 via-dusk/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs font-medium text-white/90 leading-snug">{f.judul}</span>
                </span>
              </Link>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
