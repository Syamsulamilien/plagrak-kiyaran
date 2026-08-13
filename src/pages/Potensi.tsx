import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SpotlightCard from "../components/ui/SpotlightCard";
import PageLoader from "../components/ui/PageLoader";
import { FadeInStagger, FadeInStaggerItem } from "../components/ui/FadeIn";
import { supabase } from "../lib/supabase";
import type { Potensi as PotensiType } from "../types";

export default function Potensi() {
  const [data, setData] = useState<PotensiType[] | null>(null);
  const [aktif, setAktif] = useState("Semua");

  useEffect(() => {
    supabase.from("potensi").select("*").order("kategori").then(({ data }) => setData(data ?? []));
  }, []);

  const kategoriList = useMemo(() => ["Semua", ...Array.from(new Set((data ?? []).map((p) => p.kategori)))], [data]);
  const filtered = useMemo(() => (!data ? [] : aktif === "Semua" ? data : data.filter((p) => p.kategori === aktif)), [data, aktif]);

  if (data === null) return <PageLoader />;

  return (
    <>
      <PageHero eyebrow="Kekayaan Dusun" title="Potensi Pedukuhan" description="Ragam sumber daya yang menjadi tumpuan ekonomi dan kebanggaan warga Plagrak Kiyaran." breadcrumb="Potensi" />

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <div className="flex flex-wrap gap-2.5">
            {kategoriList.map((k) => (
              <button key={k} onClick={() => setAktif(k)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${aktif === k ? "bg-primary-600 text-white shadow-soft" : "bg-mist text-dusk-700 hover:bg-earth-100"}`}>
                {k}
              </button>
            ))}
          </div>

          <FadeInStagger key={aktif} className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filtered.map((p) => (
              <FadeInStaggerItem key={p.id}>
                <SpotlightCard className="card-surface h-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-earth-50">
                    {p.gambar_url && <img src={p.gambar_url} alt={p.nama} loading="lazy" className="h-full w-full object-cover" />}
                    <span className="absolute top-3 left-3 rounded-full bg-primary-700/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">{p.kategori}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-dusk-800">{p.nama}</h3>
                    <p className="mt-2 text-sm text-dusk-700/65 leading-relaxed">{p.deskripsi}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-primary-700 font-medium"><MapPin className="h-3.5 w-3.5" /> {p.lokasi}</p>
                  </div>
                </SpotlightCard>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

          {filtered.length === 0 && <p className="mt-12 text-center text-dusk-700/50">{data.length === 0 ? "Belum ada data potensi. Tambahkan lewat halaman admin." : "Belum ada data potensi untuk kategori ini."}</p>}
        </div>
      </section>
    </>
  );
}