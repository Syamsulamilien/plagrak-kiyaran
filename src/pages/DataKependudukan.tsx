import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import FadeIn from "../components/ui/FadeIn";
import PageLoader from "../components/ui/PageLoader";
import { supabase } from "../lib/supabase";
import type { DemografiItem, KelompokUmurItem, MataPencaharianItem, StatistikRingkas } from "../types";

const PALETTE = ["#2E7D32", "#8D6E63", "#C9962C", "#57A65B", "#A1887F", "#E3C578"];

function PekerjaanTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload as MataPencaharianItem;
  return (
    <div className="max-w-xs rounded-xl bg-white shadow-soft-lg border border-earth-100 px-4 py-3">
      <p className="text-sm font-semibold text-dusk-800">{row.name} — {row.value.toLocaleString("id-ID")} orang</p>
      {row.keterangan && <p className="mt-1 text-xs text-dusk-700/60 leading-relaxed">{row.keterangan}</p>}
    </div>
  );
}

export default function DataKependudukan() {
  const [ringkas, setRingkas] = useState<StatistikRingkas[] | null>(null);
  const [kelamin, setKelamin] = useState<DemografiItem[]>([]);
  const [umur, setUmur] = useState<KelompokUmurItem[]>([]);
  const [kerja, setKerja] = useState<MataPencaharianItem[]>([]);

  useEffect(() => {
    supabase.from("statistik_ringkas").select("*").then(({ data }) => setRingkas(data ?? []));
    supabase.from("demografi_jenis_kelamin").select("*").then(({ data }) => setKelamin(data ?? []));
    supabase.from("demografi_kelompok_umur").select("*").order("kelompok").then(({ data }) => setUmur(data ?? []));
    supabase.from("mata_pencaharian").select("*").order("value", { ascending: false }).then(({ data }) => setKerja(data ?? []));
  }, []);

  if (ringkas === null) return <PageLoader />;

  const jumlahKK = ringkas.find((s) => s.label === "Jumlah KK")?.nilai ?? 0;

  return (
    <>
      <PageHero eyebrow="Statistik Warga" title="Data Kependudukan" description="Gambaran demografi warga Pedukuhan Plagrak Kiyaran berdasarkan jenis kelamin, usia, dan mata pencaharian." breadcrumb="Data Kependudukan" />

      <section className="py-20 sm:py-28">
        <div className="container-site space-y-16">
          <FadeIn className="card-surface p-6 sm:p-8">
            <SectionHeading eyebrow="Demografi" title="Jenis Kelamin" />
            <div className="h-72 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={kelamin} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3} label={(entry) => `${entry.name}: ${entry.value}`}>
                    {kelamin.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `${v.toLocaleString("id-ID")} jiwa`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </FadeIn>

          <FadeIn className="card-surface p-6 sm:p-8">
            <SectionHeading eyebrow="Usia" title="Kelompok Umur" description={`Total sekitar ${jumlahKK.toLocaleString("id-ID")} kepala keluarga tersebar dalam kelompok usia berikut.`} />
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={umur} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4D8D3" vertical={false} />
                  <XAxis dataKey="kelompok" tick={{ fontSize: 12, fill: "#5D4037" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#5D4037" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: any) => `${v.toLocaleString("id-ID")} jiwa`} cursor={{ fill: "#F4F6F8" }} />
                  <Bar dataKey="jumlah" fill="#2E7D32" radius={[8, 8, 0, 0]} maxBarSize={56} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </FadeIn>

          <FadeIn className="card-surface p-6 sm:p-8">
            <SectionHeading eyebrow="Ekonomi" title="Mata Pencaharian" />
            <div className="h-[420px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kerja} layout="vertical" margin={{ top: 10, right: 24, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4D8D3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#5D4037" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#5D4037" }} width={140} axisLine={false} tickLine={false} />
                  <Tooltip content={<PekerjaanTooltip />} cursor={{ fill: "#F4F6F8" }} />
                  <Bar dataKey="value" fill="#C9962C" radius={[0, 8, 8, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {kerja.some((k) => k.keterangan) && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {kerja.filter((k) => k.keterangan).map((k) => (
                  <div key={k.id} className="text-sm">
                    <span className="font-medium text-dusk-800">{k.name}</span>
                    <span className="text-dusk-700/60"> — {k.keterangan}</span>
                  </div>
                ))}
              </div>
            )}
          </FadeIn>

          <p className="text-center text-sm text-dusk-700/45 italic">*Semua angka di halaman ini bisa diperbarui lewat halaman admin.</p>
        </div>
      </section>
    </>
  );
}