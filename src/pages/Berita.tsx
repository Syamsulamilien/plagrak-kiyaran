import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronLeft, ChevronRight, Search, User } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import PageLoader from "../components/ui/PageLoader";
import { FadeInStagger, FadeInStaggerItem } from "../components/ui/FadeIn";
import { supabase } from "../lib/supabase";
import type { Berita as BeritaType } from "../types";

const PER_PAGE = 4;

export default function Berita() {
  const [data, setData] = useState<BeritaType[] | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    supabase.from("berita").select("*").order("tanggal", { ascending: false }).then(({ data }) => setData(data ?? []));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((b) => b.judul.toLowerCase().includes(q) || (b.ringkasan ?? "").toLowerCase().includes(q));
  }, [data, query]);

  if (data === null) return <PageLoader />;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageHero eyebrow="Kabar Dusun" title="Berita Pedukuhan" description="Kumpulan berita dan informasi kegiatan warga Plagrak Kiyaran." breadcrumb="Berita" />

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dusk-700/40" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} type="text" placeholder="Cari berita..." className="input-field rounded-full pl-11" />
          </div>

          <FadeInStagger key={page + query} className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-7">
            {paged.map((b) => (
              <FadeInStaggerItem key={b.slug}>
                <Link to={`/berita/${b.slug}`} className="group flex h-full gap-4 card-surface p-4 hover:shadow-soft-lg transition-shadow duration-300">
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-earth-50">
                    {b.gambar_url && <img src={b.gambar_url} alt={b.judul} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                  </div>
                  <div className="min-w-0 py-1">
                    {b.kategori && <span className="badge-eyebrow text-[10px] text-gold-600">{b.kategori}</span>}
                    <h3 className="mt-1.5 font-display font-semibold text-dusk-800 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">{b.judul}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-dusk-700/50">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(b.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                      {b.penulis && <span className="flex items-center gap-1"><User className="h-3 w-3" /> {b.penulis}</span>}
                    </div>
                  </div>
                </Link>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

          {paged.length === 0 && <p className="mt-12 text-center text-dusk-700/50">{data.length === 0 ? "Belum ada berita. Tambahkan lewat halaman admin." : "Berita tidak ditemukan."}</p>}

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-dusk-700 disabled:opacity-30 hover:bg-earth-100 transition-colors" aria-label="Halaman sebelumnya"><ChevronLeft className="h-4 w-4" /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${page === n ? "bg-primary-600 text-white" : "bg-mist text-dusk-700 hover:bg-earth-100"}`}>{n}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-dusk-700 disabled:opacity-30 hover:bg-earth-100 transition-colors" aria-label="Halaman berikutnya"><ChevronRight className="h-4 w-4" /></button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
