import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string; // e.g. "galeri", "struktur", "berita"
}

/** Uploads a file to the public Supabase Storage bucket "images" and returns its public URL. */
export default function ImageUpload({ value, onChange, folder }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("images").upload(path, file, { upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal upload foto");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {value ? (
        <div className="relative w-full max-w-xs">
          <img src={value} alt="Preview" className="w-full aspect-video object-cover rounded-xl border border-earth-100" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-dusk/70 text-white hover:bg-dusk transition-colors"
            aria-label="Hapus foto"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full max-w-xs aspect-video flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-earth-200 text-dusk-700/50 hover:border-primary-400 hover:text-primary-600 transition-colors disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
          <span className="text-xs font-medium">{uploading ? "Mengunggah..." : "Klik untuk unggah foto"}</span>
        </button>
      )}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
