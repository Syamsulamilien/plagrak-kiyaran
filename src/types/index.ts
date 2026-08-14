export interface Potensi {
  id: string;
  kategori: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  gambar_url: string | null;
}

export interface Berita {
  id: string;
  slug: string;
  judul: string;
  tanggal: string;
  penulis: string | null;
  kategori: string | null;
  ringkasan: string | null;
  konten: string | null;
  gambar_url: string | null;
  created_at?: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: string;
  gambar_url: string;
  created_at?: string;
}

export interface StrukturPengurus {
  id: string;
  nama: string;
  jabatan: string;
  foto_url: string | null;
  tingkat: 1 | 2 | 3 | 4;
  urutan: number;
}

export interface StatistikRingkas {
  id: string;
  label: string;
  nilai: number;
  satuan: string;
  icon: string;
}

export interface DemografiItem {
  id: string;
  name: string;
  value: number;
}

export interface KelompokUmurItem {
  id: string;
  kelompok: string;
  jumlah: number;
}

export interface MataPencaharianItem {
  id: string;
  name: string;
  value: number;
  keterangan: string | null;
}

export interface KondisiAlam {
  id: string;
  ketinggian: string;
  curah_hujan: string;
  suhu: string;
  topografi: string;
}