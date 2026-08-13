import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Images, Newspaper, Sprout, Users2 } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ berita: 0, galeri: 0, struktur: 0, potensi: 0 });

  useEffect(() => {
    async function load() {
      const [b, g, s, p] = await Promise.all([
        supabase.from("berita").select("id", { count: "exact", head: true }),
        supabase.from("galeri").select("id", { count: "exact", head: true }),
        supabase.from("struktur_organisasi").select("id", { count: "exact", head: true }),
        supabase.from("potensi").select("id", { count: "exact", head: true }),
      ]);
      setCounts({ berita: b.count ?? 0, galeri: g.count ?? 0, struktur: s.count ?? 0, potensi: p.count ?? 0 });
    }
    load();
  }, []);

  const cards = [
    { to: "/admin/berita", label: "Berita (maks. 5)", count: counts.berita, icon: Newspaper },
    { to: "/admin/galeri", label: "Foto Galeri (maks. 5)", count: counts.galeri, icon: Images },
    { to: "/admin/struktur", label: "Pengurus Struktur", count: counts.struktur, icon: Users2 },
    { to: "/admin/potensi", label: "Potensi Pedukuhan", count: counts.potensi, icon: Sprout },
  ];

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl text-dusk-800">Ringkasan</h1>
      <p className="mt-1 text-sm text-dusk-700/60">Kelola konten website Pedukuhan Plagrak Kiyaran dari sini.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="card-surface p-6 hover:shadow-soft-lg transition-shadow duration-300">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700"><c.icon className="h-5 w-5" /></span>
            <p className="mt-4 text-3xl font-display font-bold text-dusk-800">{c.count}</p>
            <p className="mt-1 text-sm text-dusk-700/60">{c.label}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}