import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import ImageUpload from "../../components/ui/ImageUpload";
import { supabase } from "../../lib/supabase";
import { deleteStorageFile } from "../../lib/storage";
import type { Potensi } from "../../types";

const KATEGORI_OPSI = ["Pertanian", "Peternakan", "UMKM", "Wisata", "Budaya", "Kuliner"];
const KOSONG = { id: "", kategori: KATEGORI_OPSI[0], nama: "", deskripsi: "", lokasi: "", gambar_url: null as string | null };

export default function AdminPotensi() {
  const [list, setList] = useState<Potensi[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof KOSONG | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("potensi").select("*").order("kategori");
    setList(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    const { id, ...rest } = editing;
    const { error } = id ? await supabase.from("potensi").update(rest).eq("id", id) : await supabase.from("potensi").insert(rest);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setEditing(null);
    load();
  }

  async function handleDelete(id: string, gambar_url: string | null) {
    if (!confirm("Hapus potensi ini?")) return;
    await deleteStorageFile(gambar_url);
    await supabase.from("potensi").delete().eq("id", id);
    load();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-dusk-800">Potensi Pedukuhan</h1>
          <p className="mt-1 text-sm text-dusk-700/60">Kelola daftar potensi pertanian, peternakan, dan lainnya.</p>
        </div>
        <Button onClick={() => { setEditing({ ...KOSONG }); setError(null); }}><Plus className="h-4 w-4" />Tambah Potensi</Button>
      </div>

      {editing && (
        <div className="mt-6 card-surface p-6 space-y-4 max-w-lg">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-dusk-800">{editing.id ? "Edit Potensi" : "Potensi Baru"}</p>
            <button onClick={() => setEditing(null)} className="text-dusk-700/50 hover:text-dusk-800"><X className="h-5 w-5" /></button>
          </div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Kategori</label>
            <select value={editing.kategori} onChange={(e) => setEditing({ ...editing, kategori: e.target.value })} className="input-field mt-1.5">
              {KATEGORI_OPSI.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div><label className="text-sm font-medium text-dusk-800">Nama Potensi</label><input value={editing.nama} onChange={(e) => setEditing({ ...editing, nama: e.target.value })} className="input-field mt-1.5" placeholder="mis. Sawah Terasering Kiyaran" /></div>
          <div><label className="text-sm font-medium text-dusk-800">Deskripsi</label><textarea rows={3} value={editing.deskripsi} onChange={(e) => setEditing({ ...editing, deskripsi: e.target.value })} className="input-field mt-1.5 resize-none" /></div>
          <div><label className="text-sm font-medium text-dusk-800">Lokasi</label><input value={editing.lokasi} onChange={(e) => setEditing({ ...editing, lokasi: e.target.value })} className="input-field mt-1.5" placeholder="mis. Sisi barat Pedukuhan" /></div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Foto</label>
            <div className="mt-1.5"><ImageUpload value={editing.gambar_url} onChange={(url) => setEditing({ ...editing, gambar_url: url })} folder="potensi" /></div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving || !editing.nama}>{saving ? "Menyimpan..." : "Simpan"}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Batal</Button>
          </div>
        </div>
      )}

      <div className="mt-6 card-surface divide-y divide-earth-100">
        {loading && <p className="p-6 text-sm text-dusk-700/50">Memuat...</p>}
        {!loading && list.length === 0 && <p className="p-6 text-sm text-dusk-700/50">Belum ada data potensi.</p>}
        {list.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
            <div className="min-w-0">
              <p className="font-medium text-dusk-800 truncate">{p.nama}</p>
              <p className="text-xs text-dusk-700/50 mt-0.5">{p.kategori} · {p.lokasi}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing({ ...p })} className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-dusk-700 hover:bg-earth-100 transition-colors"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(p.id, p.gambar_url)} className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}