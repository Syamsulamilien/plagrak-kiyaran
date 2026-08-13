import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import ImageUpload from "../../components/ui/ImageUpload";
import { supabase } from "../../lib/supabase";
import { enforceMaxRows, deleteStorageFile } from "../../lib/storage";
import type { Berita } from "../../types";

const KATEGORI_OPSI = ["Kegiatan", "Gotong Royong", "Pertanian", "UMKM", "Kesehatan", "Pemerintahan", "KKN", "Lainnya"];
const KOSONG = { id: "", slug: "", judul: "", tanggal: new Date().toISOString().slice(0, 10), penulis: "", kategori: KATEGORI_OPSI[0], ringkasan: "", konten: "", gambar_url: null as string | null };

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default function AdminBerita() {
  const [list, setList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof KOSONG | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("berita").select("*").order("tanggal", { ascending: false });
    setList(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() { setEditing({ ...KOSONG }); setError(null); }
  function openEdit(b: Berita) { setEditing({ ...b, penulis: b.penulis ?? "", kategori: b.kategori ?? KATEGORI_OPSI[0], ringkasan: b.ringkasan ?? "", konten: b.konten ?? "" }); setError(null); }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    const slug = editing.slug || slugify(editing.judul);
    const payload = { ...editing, slug };
    const { id, ...rest } = payload;
    const isNew = !id;
    const { error } = id
      ? await supabase.from("berita").update(rest).eq("id", id)
      : await supabase.from("berita").insert(rest);
    if (!error && isNew) await enforceMaxRows("berita", 5, "tanggal", "gambar_url");
    setSaving(false);
    if (error) { setError(error.message); return; }
    setEditing(null);
    load();
  }

  async function handleDelete(id: string, gambar_url: string | null) {
    if (!confirm("Hapus berita ini?")) return;
    await deleteStorageFile(gambar_url);
    await supabase.from("berita").delete().eq("id", id);
    load();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-dusk-800">Berita</h1>
          <p className="mt-1 text-sm text-dusk-700/60">Kelola berita yang tampil di halaman publik.</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" />Tulis Berita</Button>
      </div>

      {editing && (
        <div className="mt-6 card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-dusk-800">{editing.id ? "Edit Berita" : "Berita Baru"}</p>
            <button onClick={() => setEditing(null)} className="text-dusk-700/50 hover:text-dusk-800"><X className="h-5 w-5" /></button>
          </div>

          <div>
            <label className="text-sm font-medium text-dusk-800">Judul</label>
            <input value={editing.judul} onChange={(e) => setEditing({ ...editing, judul: e.target.value })} className="input-field mt-1.5" placeholder="Judul berita" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-dusk-800">Tanggal</label>
              <input type="date" value={editing.tanggal} onChange={(e) => setEditing({ ...editing, tanggal: e.target.value })} className="input-field mt-1.5" />
            </div>
            <div>
              <label className="text-sm font-medium text-dusk-800">Penulis</label>
              <input value={editing.penulis} onChange={(e) => setEditing({ ...editing, penulis: e.target.value })} className="input-field mt-1.5" placeholder="Tim KKN" />
            </div>
            <div>
              <label className="text-sm font-medium text-dusk-800">Kategori</label>
              <select value={editing.kategori} onChange={(e) => setEditing({ ...editing, kategori: e.target.value })} className="input-field mt-1.5">
                {KATEGORI_OPSI.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-dusk-800">Ringkasan</label>
            <textarea rows={2} value={editing.ringkasan} onChange={(e) => setEditing({ ...editing, ringkasan: e.target.value })} className="input-field mt-1.5 resize-none" placeholder="Ringkasan singkat 1-2 kalimat" />
          </div>

          <div>
            <label className="text-sm font-medium text-dusk-800">Isi Berita</label>
            <textarea rows={6} value={editing.konten} onChange={(e) => setEditing({ ...editing, konten: e.target.value })} className="input-field mt-1.5 resize-none" placeholder="Tulis isi berita. Pisahkan tiap paragraf dengan baris baru." />
          </div>

          <div>
            <label className="text-sm font-medium text-dusk-800">Foto Sampul</label>
            <div className="mt-1.5"><ImageUpload value={editing.gambar_url} onChange={(url) => setEditing({ ...editing, gambar_url: url })} folder="berita" /></div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving || !editing.judul}>{saving ? "Menyimpan..." : "Simpan"}</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Batal</Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-dusk-700/60">{list.length} / 5 berita tersimpan</p>
        <p className="text-xs text-dusk-700/45">*Maks. 5 berita — berita terlama otomatis terhapus saat menulis berita baru</p>
      </div>

      <div className="mt-3 card-surface divide-y divide-earth-100">
        {loading && <p className="p-6 text-sm text-dusk-700/50">Memuat...</p>}
        {!loading && list.length === 0 && <p className="p-6 text-sm text-dusk-700/50">Belum ada berita.</p>}
        {list.map((b) => (
          <div key={b.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
            <div className="min-w-0">
              <p className="font-medium text-dusk-800 truncate">{b.judul}</p>
              <p className="text-xs text-dusk-700/50 mt-0.5">{b.tanggal} · {b.kategori}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(b)} className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-dusk-700 hover:bg-earth-100 transition-colors"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(b.id, b.gambar_url)} className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}