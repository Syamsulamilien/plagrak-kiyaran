-- ============================================================
-- Setup Database untuk Website Pedukuhan Plagrak Kiyaran
-- Jalankan seluruh file ini di Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. BERITA (maks. 5 — dijaga otomatis oleh aplikasi, bukan database)
create table if not exists berita (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  judul text not null,
  tanggal date not null default current_date,
  penulis text,
  kategori text,
  ringkasan text,
  konten text,
  gambar_url text,
  created_at timestamptz default now()
);

-- 2. GALERI (maks. 5 — dijaga otomatis oleh aplikasi)
create table if not exists galeri (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  kategori text not null,
  gambar_url text not null,
  created_at timestamptz default now()
);

-- 3. STRUKTUR ORGANISASI
-- tingkat: 1=RW, 2=RT & Kader, 3=Tokoh Agama & TPA, 4=Karang Taruna
create table if not exists struktur_organisasi (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  jabatan text not null,
  foto_url text,
  tingkat int not null default 2,
  urutan int not null default 0,
  created_at timestamptz default now()
);

-- 4. POTENSI PEDUKUHAN
create table if not exists potensi (
  id uuid primary key default gen_random_uuid(),
  kategori text not null,
  nama text not null,
  deskripsi text,
  lokasi text,
  gambar_url text,
  created_at timestamptz default now()
);

-- 5. STATISTIK RINGKAS (kartu di Beranda)
create table if not exists statistik_ringkas (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  nilai int not null default 0,
  satuan text,
  icon text not null
);

-- 6. DEMOGRAFI: jenis kelamin
create table if not exists demografi_jenis_kelamin (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  value int not null default 0
);

-- 7. DEMOGRAFI: kelompok umur
create table if not exists demografi_kelompok_umur (
  id uuid primary key default gen_random_uuid(),
  kelompok text not null,
  jumlah int not null default 0
);

-- 8. MATA PENCAHARIAN
create table if not exists mata_pencaharian (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  value int not null default 0
);

-- 9. KONDISI ALAM (satu baris saja)
create table if not exists kondisi_alam (
  id uuid primary key default gen_random_uuid(),
  ketinggian text,
  curah_hujan text,
  suhu text,
  topografi text
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table berita enable row level security;
alter table galeri enable row level security;
alter table struktur_organisasi enable row level security;
alter table potensi enable row level security;
alter table statistik_ringkas enable row level security;
alter table demografi_jenis_kelamin enable row level security;
alter table demografi_kelompok_umur enable row level security;
alter table mata_pencaharian enable row level security;
alter table kondisi_alam enable row level security;

create policy "Publik baca berita" on berita for select using (true);
create policy "Admin kelola berita" on berita for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca galeri" on galeri for select using (true);
create policy "Admin kelola galeri" on galeri for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca struktur" on struktur_organisasi for select using (true);
create policy "Admin kelola struktur" on struktur_organisasi for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca potensi" on potensi for select using (true);
create policy "Admin kelola potensi" on potensi for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca statistik" on statistik_ringkas for select using (true);
create policy "Admin kelola statistik" on statistik_ringkas for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca kelamin" on demografi_jenis_kelamin for select using (true);
create policy "Admin kelola kelamin" on demografi_jenis_kelamin for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca umur" on demografi_kelompok_umur for select using (true);
create policy "Admin kelola umur" on demografi_kelompok_umur for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca pekerjaan" on mata_pencaharian for select using (true);
create policy "Admin kelola pekerjaan" on mata_pencaharian for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Publik baca alam" on kondisi_alam for select using (true);
create policy "Admin kelola alam" on kondisi_alam for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE
-- ============================================================
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "Publik lihat foto" on storage.objects for select using (bucket_id = 'images');
create policy "Admin upload foto" on storage.objects for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "Admin hapus foto" on storage.objects for delete using (bucket_id = 'images' and auth.role() = 'authenticated');

-- ============================================================
-- DATA AWAL (seed)
-- ============================================================
insert into struktur_organisasi (nama, jabatan, tingkat, urutan) values
  ('Sugeng Supranto', 'Ketua RW', 1, 0),
  ('Adi Suryanto', 'Ketua RT 003', 2, 0),
  ('Sugiyanto', 'Ketua RT 004', 2, 1),
  ('Suratinah', 'Kader', 2, 2),
  ('Giyono', 'Tokoh Agama', 3, 0),
  ('Sriyanto', 'Tokoh Agama', 3, 1),
  ('Muhammad Ali Sa''id', 'Tokoh Agama', 3, 2),
  ('Nur Akidah', 'Pengajar TPA', 3, 3),
  ('Sumaryanti', 'Pengajar TPA', 3, 4),
  ('Abiyan Daffa', 'Ketua Karang Taruna', 4, 0),
  ('Refa Salsabila', 'Bendahara 1 Karang Taruna', 4, 1),
  ('Desi Indah', 'Bendahara 2 Karang Taruna', 4, 2),
  ('Rosyiana Ardelia', 'Sekretaris 1 Karang Taruna', 4, 3),
  ('Annura Syifa', 'Sekretaris 2 Karang Taruna', 4, 4),
  ('Bimo Kuncoro', 'Humas Karang Taruna', 4, 5)
on conflict do nothing;

insert into potensi (kategori, nama, deskripsi, lokasi) values
  ('Pertanian', 'Sawah Terasering Kiyaran', 'Hamparan sawah berundak di lereng bukit yang menghasilkan padi, cabai, dan sayuran dataran tinggi sepanjang tahun.', 'Sisi barat Pedukuhan'),
  ('Pertanian', 'Kebun Salak Pondoh', 'Perkebunan salak pondoh khas lereng Merapi yang dikelola turun-temurun oleh warga.', 'Dusun bagian utara'),
  ('Peternakan', 'Kelompok Ternak Sapi Perah', 'Kandang komunal sapi perah dan sapi potong yang dikelola kelompok tani ternak setempat.', 'Area kandang komunal RT 03')
on conflict do nothing;

insert into statistik_ringkas (label, nilai, satuan, icon) values
  ('Jumlah Penduduk', 153, 'Jiwa', 'Users'),
  ('Jumlah KK', 45, 'KK', 'Home'),
  ('Jumlah RT', 2, 'RT', 'MapPinned'),
  ('Luas Wilayah', 187, 'Ha', 'Mountain')
on conflict do nothing;

insert into demografi_jenis_kelamin (name, value) values
  ('Laki-laki', 81), ('Perempuan', 71)
on conflict do nothing;

insert into demografi_kelompok_umur (kelompok, jumlah) values
  ('0-14 th', 26), ('15-24 th', 18), ('25-44 th', 49), ('45-64 th', 42), ('65+ th', 18)
on conflict do nothing;

insert into mata_pencaharian (name, value) values
  ('Karyawan Swasta', 31), ('Ibu Rumah Tangga', 30), ('Pelajar/Mahasiswa', 22),
  ('Belum/Tidak Bekerja', 21), ('Buruh Harian Lepas', 15), ('Petani', 13),
  ('Wiraswasta', 4), ('Buruh Tani', 4), ('PNS', 3), ('Karyawan BUMN', 1),
  ('Perawat', 1), ('Pensiunan', 1), ('Tukang Batu', 1)
on conflict do nothing;

insert into kondisi_alam (ketinggian, curah_hujan, suhu, topografi) values
  ('±500 mdpl', '±2.225 mm/tahun', '19–24°C', 'Perbukitan dan lereng bagian selatan Gunung Merapi, didominasi lahan pertanian berundak (terasering) dan kebun campur.')
on conflict do nothing;