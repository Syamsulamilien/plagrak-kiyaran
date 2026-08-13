import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import ImageUpload from "../../components/ui/ImageUpload";
import { supabase } from "../../lib/supabase";
import { KATEGORI_GALERI } from "../../lib/constants";
import type { GaleriItem } from "../../types";

const KOSONG = { judul: "", kategori: KATEGORI_GALERI[0] as string, gambar_url: null as string | null };

export default function AdminGaleri() {
  const [list, setList] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<typeof KOSONG | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
    setList(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!form || !form.gambar_url) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase.from("galeri").insert(form);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setForm(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus foto ini?")) return;
    await supabase.from("galeri").delete().eq("id", id);
    load();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-dusk-800">Galeri</h1>
          <p className="mt-1 text-sm text-dusk-700/60">Tambah atau hapus foto yang tampil di halaman Galeri.</p>
        </div>
        <Button onClick={() => setForm({ ...KOSONG })}><Plus className="h-4 w-4" />Tambah Foto</Button>
      </div>

      {form && (
        <div className="mt-6 card-surface p-6 space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-dusk-800">Foto Baru</p>
            <button onClick={() => setForm(null)} className="text-dusk-700/50 hover:text-dusk-800"><X className="h-5 w-5" /></button>
          </div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Judul / Keterangan Foto</label>
            <input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="input-field mt-1.5" placeholder="mis. Kerja bakti bersih dusun" />
          </div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Kategori</label>
            <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="input-field mt-1.5">
              {KATEGORI_GALERI.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Foto</label>
            <div className="mt-1.5"><ImageUpload value={form.gambar_url} onChange={(url) => setForm({ ...form, gambar_url: url })} folder="galeri" /></div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving || !form.judul || !form.gambar_url}>{saving ? "Menyimpan..." : "Simpan"}</Button>
            <Button variant="secondary" onClick={() => setForm(null)}>Batal</Button>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && <p className="text-sm text-dusk-700/50 col-span-full">Memuat...</p>}
        {!loading && list.length === 0 && <p className="text-sm text-dusk-700/50 col-span-full">Belum ada foto.</p>}
        {list.map((g) => (
          <div key={g.id} className="group relative card-surface overflow-hidden">
            <img src={g.gambar_url} alt={g.judul} className="aspect-square w-full object-cover" />
            <div className="p-3">
              <p className="text-xs font-medium text-dusk-800 truncate">{g.judul}</p>
              <p className="text-[11px] text-dusk-700/50">{g.kategori}</p>
            </div>
            <button onClick={() => handleDelete(g.id)} className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
