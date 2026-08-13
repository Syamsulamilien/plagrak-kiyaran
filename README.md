# Website Pedukuhan Plagrak Kiyaran (+ Admin CMS)

React + Vite + TypeScript + Tailwind + Framer Motion, dengan admin panel berbasis **Supabase**
(database + auth + storage foto) untuk mengelola Berita, Galeri, dan Struktur Organisasi tanpa edit kode.

## 1. Setup Supabase (wajib dilakukan dulu sebelum menjalankan situs)

1. Buat akun & project baru di [supabase.com](https://supabase.com) (gratis).
2. Buka **SQL Editor** di dashboard project, tempel seluruh isi file `supabase-setup.sql` (ada di folder ini), lalu klik **Run**. Ini akan membuat tabel `berita`, `galeri`, `struktur_organisasi`, aturan keamanan (RLS), storage bucket `images`, dan mengisi data struktur organisasi yang sudah ada.
3. Buat akun admin: buka **Authentication > Users > Add user**, isi email & password admin kamu (ini yang dipakai login di `/admin/login`).
4. Ambil kredensial: buka **Project Settings > API**, salin **Project URL** dan **anon public key**.
5. Di folder project, copy `.env.example` jadi `.env`, isi dengan kredensial dari langkah 4:
   ```
   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=isi-anon-key-nya
   ```

## 2. Menjalankan Project

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` untuk situs publik, dan `http://localhost:5173/admin/login` untuk masuk ke admin panel (pakai email/password dari langkah 3 di atas).

Build produksi: `npm run build` lalu `npm run preview`.

**Saat deploy** (Netlify/Vercel/dll), jangan lupa set `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sebagai environment variable di platform hosting-nya juga — isi `.env` tidak ikut ter-upload (memang sengaja, untuk keamanan).

## 3. Yang Bisa Dikelola Lewat Admin

- **Berita** (`/admin/berita`) — tulis, edit, hapus berita. Slug URL dibuat otomatis dari judul.
- **Galeri** (`/admin/galeri`) — upload & hapus foto per kategori.
- **Struktur Organisasi** (`/admin/struktur`) — kelola RW, RT, Kader, Tokoh Agama, TPA. Field "Tingkat" menentukan grup tampilannya, "Urutan" menentukan urutan dalam grup.

Semua foto tersimpan di Supabase Storage (bucket `images`), otomatis publik dan bisa diakses lewat URL.

## 4. Konten yang Masih Statis (belum lewat admin)

Potensi Pedukuhan, statistik ringkas, dan chart Data Kependudukan masih diatur lewat kode di `src/data/statistik.ts` dan `src/data/potensi.ts` — sengaja tidak dibuat admin-manageable karena jarang berubah. Kalau nanti mau ini juga dikelola dari admin, tinggal minta bikinkan.

## 5. Struktur Proyek

```
src/
├── lib/supabase.ts          Koneksi ke Supabase
├── context/AuthContext.tsx  Status login admin
├── components/
│   ├── layout/               Navbar, Footer, AdminLayout, dst
│   ├── ui/                   Komponen animasi & UI reusable + ImageUpload, ProtectedRoute
│   └── sections/              Blok konten halaman Beranda
├── pages/                    Halaman publik
├── pages/admin/               Halaman admin (login, dashboard, CRUD)
├── data/                      Data statis (potensi, statistik)
└── types/                     Tipe TypeScript bersama
supabase-setup.sql            Script SQL setup database (jalankan sekali di awal)
```

## Palet Warna & Font

- Primary (hijau): `#2E7D32` — `tailwind.config.js` → `colors.primary`
- Secondary (coklat): `#8D6E63` → `colors.earth`
- Aksen emas: `#C9962C` → `colors.gold`
- Font: Poppins (heading) + Inter (body)

## Catatan Keamanan

- Semua tabel pakai Row Level Security: siapa saja boleh **baca**, tapi cuma akun yang login (admin) yang boleh **tulis/ubah/hapus**.
- Jangan bagikan `anon key` sembarangan sebagai "rahasia" — key ini memang didesain publik (aman dipakai di frontend), keamanan sebenarnya ada di RLS policy di atas. Yang harus dijaga kerahasiaannya adalah password akun admin.
- Tidak ada fitur "daftar akun admin sendiri" di halaman publik — akun admin hanya bisa dibuat lewat dashboard Supabase, supaya orang luar tidak bisa membuat akun admin sembarangan.

---
© 2026 Pedukuhan Plagrak Kiyaran — dikembangkan oleh Mahasiswa KKN Universitas 'Aisyiyah Yogyakarta
