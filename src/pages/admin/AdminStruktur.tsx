import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import ImageUpload from "../../components/ui/ImageUpload";
import { supabase } from "../../lib/supabase";
import type { StrukturPengurus } from "../../types";

const KOSONG = { id: "", nama: "", jabatan: "", foto_url: null as string | null, tingkat: 2 as 1 | 2 | 3 | 4, urutan: 0 };
const TINGKAT_LABEL: Record<number, string> = { 1: "1 — Pimpinan (RW)", 2: "2 — Pengurus Inti (RT & Kader)", 3: "3 — Tokoh Agama & TPA", 4: "4 — Karang Taruna" };

export default function AdminStruktur() {
  const [list, setList] = useState<StrukturPengurus[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof KOSONG | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("struktur_organisasi").select("*").order("tingkat").order("urutan");
    setList(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    const { id, ...rest } = editing;
    const { error } = id ? await supabase.from("struktur_organisasi").update(rest).eq("id", id) : await supabase.from("struktur_organisasi").insert(rest);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus pengurus ini?")) return;
    await supabase.from("struktur_organisasi").delete().eq("id", id);
    load();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-dusk-800">Struktur Organisasi</h1>
          <p className="mt-1 text-sm text-dusk-700/60">Kelola daftar RW, RT, Kader, Tokoh Agama, TPA, dan Karang Taruna.</p>
        </div>
        <Button onClick={() => { setEditing({ ...KOSONG }); setError(null); }}><Plus className="h-4 w-4" />Tambah Pengurus</Button>
      </div>

      {editing && (
        <div className="mt-6 card-surface p-6 space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-dusk-800">{editing.id ? "Edit Pengurus" : "Pengurus Baru"}</p>
            <button onClick={() => setEditing(null)} className="text-dusk-700/50 hover:text-dusk-800"><X className="h-5 w-5" /></button>
          </div>
          <div><label className="text-sm font-medium text-dusk-800">Nama</label><input value={editing.nama} onChange={(e) => setEditing({ ...editing, nama: e.target.value })} className="input-field mt-1.5" /></div>
          <div><label className="text-sm font-medium text-dusk-800">Jabatan</label><input value={editing.jabatan} onChange={(e) => setEditing({ ...editing, jabatan: e.target.value })} className="input-field mt-1.5" placeholder="mis. Ketua RT 003" /></div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Tingkat Tampilan</label>
            <select value={editing.tingkat} onChange={(e) => setEditing({ ...editing, tingkat: Number(e.target.value) as 1 | 2 | 3 | 4 })} className="input-field mt-1.5">
              {[1, 2, 3, 4].map((t) => <option key={t} value={t}>{TINGKAT_LABEL[t]}</option>)}
            </select>
          </div>
          <div><label className="text-sm font-medium text-dusk-800">Urutan (angka kecil tampil dulu)</label><input type="number" value={editing.urutan} onChange={(e) => setEditing({ ...editing, urutan: Number(e.target.value) })} className="input-field mt-1.5" /></div>
          <div>
            <label className="text-sm font-medium text-dusk-800">Foto</label>
            <div className="mt-1.5"><ImageUpload value={editing.foto_url} onChange={(url) => setEditing({ ...editing, foto_url: url })} folder="struktur" /></div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving || !editing.nama || !editing.jabatan}>{saving ? "Menyimpan..." : "Simpan"}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Batal</Button>
          </div>
        </div>
      )}

      <div className="mt-6 card-surface divide-y divide-earth-100">
        {loading && <p className="p-6 text-sm text-dusk-700/50">Memuat...</p>}
        {!loading && list.length === 0 && <p className="p-6 text-sm text-dusk-700/50">Belum ada data pengurus.</p>}
        {list.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-earth-50 shrink-0">{p.foto_url && <img src={p.foto_url} alt={p.nama} className="h-full w-full object-cover" />}</div>
              <div className="min-w-0">
                <p className="font-medium text-dusk-800 truncate">{p.nama}</p>
                <p className="text-xs text-dusk-700/50 mt-0.5">{p.jabatan} · Tingkat {p.tingkat}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing({ ...p })} className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-dusk-700 hover:bg-earth-100 transition-colors"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}