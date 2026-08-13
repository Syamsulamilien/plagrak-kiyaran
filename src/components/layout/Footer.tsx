import { Link } from "react-router-dom";
import { Mail, MapPin, Mountain, Phone } from "lucide-react";
import ContourDivider from "../ui/ContourDivider";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";

const menuCepat = [
  { to: "/tentang", label: "Tentang Pedukuhan" },
  { to: "/struktur-organisasi", label: "Struktur Organisasi" },
  { to: "/potensi", label: "Potensi Pedukuhan" },
  { to: "/berita", label: "Berita" },
  { to: "/galeri", label: "Galeri" },
  { to: "/kontak", label: "Kontak" },
];

export default function Footer() {
  return (
    <footer className="relative bg-dusk text-white/80">
      <ContourDivider tone="dark" className="absolute -top-5 sm:-top-9" />
      <div className="container-site pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
                <Mountain className="h-5 w-5 text-white" strokeWidth={2.25} />
              </span>
              <span className="font-display font-semibold text-white text-sm leading-tight">Pedukuhan<br />Plagrak Kiyaran</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Media informasi resmi warga Pedukuhan Plagrak Kiyaran, Kalurahan Wukirsari, Kapanewon Cangkringan, Kabupaten Sleman, Daerah Istimewa Yogyakarta.
            </p>
            <div className="mt-5 flex gap-3">
              {[InstagramIcon, FacebookIcon, YoutubeIcon].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-primary-400 hover:bg-primary-600/20 transition-colors" aria-label="Media sosial">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display font-semibold text-white text-sm mb-4">Menu Cepat</p>
            <ul className="space-y-2.5">
              {menuCepat.map((m) => (
                <li key={m.to}><Link to={m.to} className="text-sm text-white/60 hover:text-primary-300 transition-colors">{m.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white text-sm mb-4">Kontak</p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2.5"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary-400" /><span>Pedukuhan Plagrak Kiyaran, Wukirsari, Cangkringan, Sleman, DIY</span></li>
              <li className="flex gap-2.5"><Phone className="h-4 w-4 shrink-0 mt-0.5 text-primary-400" /><span>0812-xxxx-xxxx (Kantor Pedukuhan)</span></li>
              <li className="flex gap-2.5"><Mail className="h-4 w-4 shrink-0 mt-0.5 text-primary-400" /><span>plagrakkiyaran@wukirsari.desa.id</span></li>
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white text-sm mb-4">Jam Pelayanan</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex justify-between gap-4"><span>Senin – Jumat</span><span>08.00 – 15.00</span></li>
              <li className="flex justify-between gap-4"><span>Sabtu</span><span>08.00 – 12.00</span></li>
              <li className="flex justify-between gap-4"><span>Minggu / Libur</span><span>Tutup</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <p>© 2026 Pedukuhan Plagrak Kiyaran</p>
          <p>Website dikembangkan oleh Mahasiswa KKN Universitas &apos;Aisyiyah Yogyakarta</p>
          <Link to="/admin/login" className="hover:text-white/70 transition-colors">Login Admin</Link>
        </div>
      </div>
    </footer>
  );
}
