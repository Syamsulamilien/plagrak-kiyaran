import { useEffect, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import { supabase } from "../../lib/supabase";
import type { DemografiItem, KelompokUmurItem, KondisiAlam, MataPencaharianItem, StatistikRingkas } from "../../types";

export default function AdminDataKependudukan() {
  const [ringkas, setRingkas] = useState<StatistikRingkas[]>([]);
  const [kelamin, setKelamin] = useState<DemografiItem[]>([]);
  const [umur, setUmur] = useState<KelompokUmurItem[]>([]);
  const [kerja, setKerja] = useState<MataPencaharianItem[]>([]);
  const [alam, setAlam] = useState<KondisiAlam | null>(null);
  const [savedFlag, setSavedFlag] = useState<string | null>(null);

  async function loadAll() {
    const [r, k, u, p, a] = await Promise.all([
      supabase.from("statistik_ringkas").select("*").order("label"),
      supabase.from("demografi_jenis_kelamin").select("*"),
      supabase.from("demografi_kelompok_umur").select("*").order("kelompok"),
      supabase.from("mata_pencaharian").select("*").order("value", { ascending: false }),
      supabase.from("kondisi_alam").select("*").limit(1).maybeSingle(),
    ]);
    setRingkas(r.data ?? []);
    setKelamin(k.data ?? []);
    setUmur(u.data ?? []);
    setKerja(p.data ?? []);
    setAlam(a.data);
  }

  useEffect(() => { loadAll(); }, []);

  function flash(key: string) {
    setSavedFlag(key);
    setTimeout(() => setSavedFlag(null), 1500);
  }

  async function saveRingkas(row: StatistikRingkas) {
    await supabase.from("statistik_ringkas").update({ nilai: row.nilai }).eq("id", row.id);
    flash(row.id);
  }
  async function saveKelamin(row: DemografiItem) {
    await supabase.from("demografi_jenis_kelamin").update({ value: row.value }).eq("id", row.id);
    flash(row.id);
  }
  async function saveUmur(row: KelompokUmurItem) {
    await supabase.from("demografi_kelompok_umur").update({ jumlah: row.jumlah }).eq("id", row.id);
    flash(row.id);
  }
  async function saveAlam() {
    if (!alam) return;
    const { id, ...rest } = alam;
    await supabase.from("kondisi_alam").update(rest).eq("id", id);
    flash("alam");
  }

  async function addKerja() {
    const { data } = await supabase.from("mata_pencaharian").insert({ name: "Pekerjaan Baru", value: 0, keterangan: "" }).select().single();
    if (data) setKerja([...kerja, data]);
  }
  async function saveKerja(row: MataPencaharianItem) {
    await supabase.from("mata_pencaharian").update({ name: row.name, value: row.value, keterangan: row.keterangan }).eq("id", row.id);
    flash(row.id);
  }
  async function deleteKerja(id: string) {
    await supabase.from("mata_pencaharian").delete().eq("id", id);
    setKerja(kerja.filter((k) => k.id !== id));
  }

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl text-dusk-800">Data Kependudukan & Statistik</h1>
      <p className="mt-1 text-sm text-dusk-700/60">Angka di sini otomatis dipakai di halaman Beranda dan Data Kependudukan.</p>

      {/* Statistik Ringkas */}
      <section className="mt-8 card-surface p-6">
        <p className="font-display font-semibold text-dusk-800">Statistik Ringkas (kartu di Beranda)</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ringkas.map((r) => (
            <div key={r.id}>
              <label className="text-xs font-medium text-dusk-700/60">{r.label} ({r.satuan})</label>
              <div className="mt-1 flex gap-2">
                <input type="number" value={r.nilai} onChange={(e) => setRingkas(ringkas.map((x) => x.id === r.id ? { ...x, nilai: Number(e.target.value) } : x))} className="input-field" />
                <button onClick={() => saveRingkas(r)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">
                  {savedFlag === r.id ? <Check className="h-4 w-4" /> : "✓"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jenis Kelamin */}
      <section className="mt-6 card-surface p-6">
        <p className="font-display font-semibold text-dusk-800">Jenis Kelamin</p>
        <div className="mt-4 grid grid-cols-2 gap-4 max-w-sm">
          {kelamin.map((k) => (
            <div key={k.id}>
              <label className="text-xs font-medium text-dusk-700/60">{k.name}</label>
              <div className="mt-1 flex gap-2">
                <input type="number" value={k.value} onChange={(e) => setKelamin(kelamin.map((x) => x.id === k.id ? { ...x, value: Number(e.target.value) } : x))} className="input-field" />
                <button onClick={() => saveKelamin(k)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">✓</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kelompok Umur */}
      <section className="mt-6 card-surface p-6">
        <p className="font-display font-semibold text-dusk-800">Kelompok Umur</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {umur.map((u) => (
            <div key={u.id}>
              <label className="text-xs font-medium text-dusk-700/60">{u.kelompok}</label>
              <div className="mt-1 flex gap-2">
                <input type="number" value={u.jumlah} onChange={(e) => setUmur(umur.map((x) => x.id === u.id ? { ...x, jumlah: Number(e.target.value) } : x))} className="input-field" />
                <button onClick={() => saveUmur(u)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">✓</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mata Pencaharian */}
      <section className="mt-6 card-surface p-6">
        <div className="flex items-center justify-between">
          <p className="font-display font-semibold text-dusk-800">Mata Pencaharian</p>
          <Button size="sm" variant="secondary" onClick={addKerja}><Plus className="h-3.5 w-3.5" />Tambah Baris</Button>
        </div>
        <div className="mt-4 space-y-3">
          {kerja.map((k) => (
            <div key={k.id} className="rounded-xl border border-earth-100 p-3 space-y-2">
              <div className="flex gap-2 items-center">
                <input value={k.name} onChange={(e) => setKerja(kerja.map((x) => x.id === k.id ? { ...x, name: e.target.value } : x))} className="input-field flex-1" placeholder="Nama pekerjaan" />
                <input type="number" value={k.value} onChange={(e) => setKerja(kerja.map((x) => x.id === k.id ? { ...x, value: Number(e.target.value) } : x))} className="input-field w-24" />
                <button onClick={() => saveKerja(k)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">✓</button>
                <button onClick={() => deleteKerja(k.id)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
              <input value={k.keterangan ?? ""} onChange={(e) => setKerja(kerja.map((x) => x.id === k.id ? { ...x, keterangan: e.target.value } : x))} className="input-field text-sm" placeholder="Keterangan, mis. Bekerja sebagai pegawai di perusahaan/instansi swasta" />
            </div>
          ))}
        </div>
      </section>

      {/* Kondisi Alam */}
      {alam && (
        <section className="mt-6 card-surface p-6">
          <p className="font-display font-semibold text-dusk-800">Kondisi Alam</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className="text-xs font-medium text-dusk-700/60">Ketinggian</label><input value={alam.ketinggian} onChange={(e) => setAlam({ ...alam, ketinggian: e.target.value })} className="input-field mt-1" /></div>
            <div><label className="text-xs font-medium text-dusk-700/60">Curah Hujan</label><input value={alam.curah_hujan} onChange={(e) => setAlam({ ...alam, curah_hujan: e.target.value })} className="input-field mt-1" /></div>
            <div><label className="text-xs font-medium text-dusk-700/60">Suhu</label><input value={alam.suhu} onChange={(e) => setAlam({ ...alam, suhu: e.target.value })} className="input-field mt-1" /></div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-dusk-700/60">Topografi</label>
            <textarea rows={2} value={alam.topografi} onChange={(e) => setAlam({ ...alam, topografi: e.target.value })} className="input-field mt-1 resize-none" />
          </div>
          <Button size="sm" className="mt-3" onClick={saveAlam}>Simpan Kondisi Alam</Button>
        </section>
      )}
    </AdminLayout>
  );
}