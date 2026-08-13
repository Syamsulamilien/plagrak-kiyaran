import { useEffect, useMemo, useState } from "react";
import { Expand } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Lightbox from "../components/ui/Lightbox";
import FadeIn from "../components/ui/FadeIn";
import PageLoader from "../components/ui/PageLoader";
import { supabase } from "../lib/supabase";
import { KATEGORI_GALERI } from "../lib/constants";
import type { GaleriItem } from "../types";

export default function Galeri() {
  const [data, setData] = useState<GaleriItem[] | null>(null);
  const [aktif, setAktif] = useState<string>("Semua");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.from("galeri").select("*").order("created_at", { ascending: false }).then(({ data }) => setData(data ?? []));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    return aktif === "Semua" ? data : data.filter((g) => g.kategori === aktif);
  }, [data, aktif]);

  if (data === null) return <PageLoader />;

  return (
    <>
      <PageHero eyebrow="Dokumentasi" title="Galeri Pedukuhan" description="Momen kegiatan, gotong royong, budaya, dan keseharian warga Plagrak Kiyaran." breadcrumb="Galeri" />

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <div className="flex flex-wrap gap-2.5">
            {["Semua", ...KATEGORI_GALERI].map((k) => (
              <button key={k} onClick={() => setAktif(k)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${aktif === k ? "bg-primary-600 text-white shadow-soft" : "bg-mist text-dusk-700 hover:bg-earth-100"}`}>
                {k}
              </button>
            ))}
          </div>

          <FadeIn key={aktif} className="mt-9 columns-2 sm:columns-3 lg:columns-4 gap-4">
            {filtered.map((item, i) => (
              <button key={item.id} onClick={() => setActiveIndex(i)} className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-offset-4">
                <img src={item.gambar_url} alt={item.judul} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-dusk/80 via-dusk/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-left">
                  <Expand className="h-4 w-4 text-white/80 mb-1.5" />
                  <span className="text-xs font-medium text-white/90 leading-snug">{item.judul}</span>
                </span>
              </button>
            ))}
          </FadeIn>

          {filtered.length === 0 && <p className="mt-12 text-center text-dusk-700/50">Belum ada foto untuk kategori ini. Tambahkan lewat halaman admin.</p>}
        </div>
      </section>

      <Lightbox items={filtered} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </>
  );
}
