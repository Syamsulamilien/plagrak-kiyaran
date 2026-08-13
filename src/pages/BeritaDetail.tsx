import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, ChevronLeft, User } from "lucide-react";
import FadeIn from "../components/ui/FadeIn";
import Button from "../components/ui/Button";
import PageLoader from "../components/ui/PageLoader";
import { supabase } from "../lib/supabase";
import type { Berita } from "../types";
import NotFound from "./NotFound";

export default function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState<Berita | null | undefined>(undefined);
  const [lainnya, setLainnya] = useState<Berita[]>([]);

  useEffect(() => {
    if (!slug) return;
    supabase.from("berita").select("*").eq("slug", slug).maybeSingle().then(({ data }) => setBerita(data));
    supabase.from("berita").select("*").neq("slug", slug).order("tanggal", { ascending: false }).limit(3).then(({ data }) => setLainnya(data ?? []));
  }, [slug]);

  if (berita === undefined) return <PageLoader />;
  if (berita === null) return <NotFound />;

  const paragraf = (berita.konten ?? "").split("\n").map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-primary-800">
        <div className="container-site">
          <Link to="/berita" className="inline-flex items-center gap-1.5 text-sm text-primary-100/80 hover:text-white transition-colors"><ChevronLeft className="h-4 w-4" /> Kembali ke Berita</Link>
          <FadeIn>
            {berita.kategori && <span className="badge-eyebrow text-gold-300 mt-6">{berita.kategori}</span>}
            <h1 className="mt-3 max-w-3xl text-2xl sm:text-4xl font-display font-bold text-white leading-tight">{berita.judul}</h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-100/70">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(berita.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
              {berita.penulis && <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {berita.penulis}</span>}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <FadeIn>
              {berita.gambar_url && (
                <div className="aspect-[16/9] overflow-hidden rounded-3xl">
                  <img src={berita.gambar_url} alt={berita.judul} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="mt-8 space-y-5 text-dusk-700/80 leading-relaxed text-[15px] sm:text-base">
                {paragraf.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </FadeIn>
          </div>

          <aside className="lg:col-span-4">
            <p className="font-display font-semibold text-dusk-800 mb-4">Berita Lainnya</p>
            <div className="space-y-4">
              {lainnya.map((b) => (
                <Link key={b.slug} to={`/berita/${b.slug}`} className="group flex gap-3 card-surface p-3 hover:shadow-soft-lg transition-shadow duration-300">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-earth-50">
                    {b.gambar_url && <img src={b.gambar_url} alt={b.judul} loading="lazy" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-dusk-800 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">{b.judul}</p>
                    <p className="mt-1 text-xs text-dusk-700/45">{new Date(b.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Button to="/berita" variant="secondary" className="mt-5 w-full justify-center">Lihat Semua Berita</Button>
          </aside>
        </div>
      </section>
    </>
  );
}
