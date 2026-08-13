import { useEffect, useState } from "react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import PageLoader from "../components/ui/PageLoader";
import { FadeInStagger, FadeInStaggerItem } from "../components/ui/FadeIn";
import { supabase } from "../lib/supabase";
import type { StrukturPengurus } from "../types";

export default function StrukturOrganisasi() {
  const [data, setData] = useState<StrukturPengurus[] | null>(null);

  useEffect(() => {
    supabase.from("struktur_organisasi").select("*").order("tingkat").order("urutan").then(({ data }) => setData(data ?? []));
  }, []);

  if (data === null) return <PageLoader />;

  const rw = data.filter((s) => s.tingkat === 1);
  const inti = data.filter((s) => s.tingkat === 2);
  const tokoh = data.filter((s) => s.tingkat === 3);
  const kartar = data.filter((s) => s.tingkat === 4);

  return (
    <>
      <PageHero eyebrow="Kelembagaan" title="Struktur Organisasi" description="Perangkat dan pengurus yang menggerakkan roda kegiatan Pedukuhan Plagrak Kiyaran." breadcrumb="Struktur Organisasi" />

      <section className="py-20 sm:py-28">
        <div className="container-site">
          {rw.length > 0 && (
            <>
              <SectionHeading align="center" eyebrow="Pimpinan Pedukuhan" title="RW" />
              <div className="mt-10 flex justify-center flex-wrap gap-6">
                {rw.map((d) => <PengurusCard key={d.id} pengurus={d} featured />)}
              </div>
              <div className="mt-10 flex justify-center"><div className="h-10 w-px bg-earth-200" /></div>
            </>
          )}

          {inti.length > 0 && (
            <>
              <SectionHeading align="center" eyebrow="Pengurus Inti" title="RT & Kader" className="mt-2" />
              <FadeInStagger className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {inti.map((p) => <FadeInStaggerItem key={p.id}><PengurusCard pengurus={p} /></FadeInStaggerItem>)}
              </FadeInStagger>
            </>
          )}

          {tokoh.length > 0 && (
            <div className="mt-16">
              <SectionHeading align="center" eyebrow="Penggerak Masyarakat" title="Tokoh Agama & TPA" />
              <FadeInStagger className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {tokoh.map((p) => <FadeInStaggerItem key={p.id}><PengurusCard pengurus={p} /></FadeInStaggerItem>)}
              </FadeInStagger>
            </div>
          )}

          {kartar.length > 0 && (
            <div className="mt-16">
              <SectionHeading align="center" eyebrow="Organisasi Pemuda" title="Karang Taruna" />
              <FadeInStagger className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {kartar.map((p) => <FadeInStaggerItem key={p.id}><PengurusCard pengurus={p} /></FadeInStaggerItem>)}
              </FadeInStagger>
            </div>
          )}

          {data.length === 0 && <p className="text-center text-dusk-700/50">Data struktur organisasi belum diisi. Silakan tambahkan lewat halaman admin.</p>}
        </div>
      </section>
    </>
  );
}

function PengurusCard({ pengurus, featured = false }: { pengurus: StrukturPengurus; featured?: boolean }) {
  return (
    <div className={`card-surface p-4 text-center hover:shadow-soft-lg transition-shadow duration-300 ${featured ? "w-48 sm:w-56 p-6" : ""}`}>
      <div className={`mx-auto overflow-hidden rounded-2xl bg-earth-50 ${featured ? "h-32 w-32 sm:h-36 sm:w-36" : "h-20 w-20 sm:h-24 sm:w-24"}`}>
        {pengurus.foto_url ? (
          <img src={pengurus.foto_url} alt={pengurus.nama} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-earth-300 text-xs">Foto</div>
        )}
      </div>
      <p className={`mt-3 font-display font-semibold text-dusk-800 ${featured ? "text-base" : "text-sm"}`}>{pengurus.nama}</p>
      <p className={`text-primary-700 ${featured ? "text-sm mt-0.5" : "text-xs mt-0.5"}`}>{pengurus.jabatan}</p>
    </div>
  );
}