import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Mountain, X } from "lucide-react";

const profilLinks = [
  { to: "/tentang", label: "Tentang Pedukuhan" },
  { to: "/struktur-organisasi", label: "Struktur Organisasi" },
  { to: "/data-kependudukan", label: "Data Kependudukan" },
  { to: "/peta", label: "Peta Wilayah" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${solid ? "bg-white/90 backdrop-blur-md shadow-soft" : "bg-transparent"}`}>
      <nav className="container-site flex h-[72px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${solid ? "bg-primary-600" : "bg-white/15 backdrop-blur-sm border border-white/30"}`}>
            <Mountain className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className={`font-display font-semibold leading-tight text-sm sm:text-base ${solid ? "text-dusk-800" : "text-white"}`}>
            Pedukuhan<br className="hidden sm:block" /> <span className="sm:hidden"> </span>Plagrak Kiyaran
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <NavItem to="/" label="Beranda" solid={solid} />
          <Dropdown label="Profil" links={profilLinks} solid={solid} open={openDropdown === "profil"} onToggle={() => setOpenDropdown(openDropdown === "profil" ? null : "profil")} />
          <NavItem to="/potensi" label="Potensi" solid={solid} />
          <NavItem to="/berita" label="Berita" solid={solid} />
          <NavItem to="/galeri" label="Galeri" solid={solid} />
          <NavItem to="/kontak" label="Kontak" solid={solid} />
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-lg ${solid ? "text-dusk-800" : "text-white"}`} aria-label={mobileOpen ? "Tutup menu" : "Buka menu"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="lg:hidden overflow-hidden bg-white border-t border-earth-100">
            <div className="container-site py-4 flex flex-col gap-1">
              <MobileLink to="/" label="Beranda" />
              <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-dusk-700/50">Profil Pedukuhan</p>
              {profilLinks.map((l) => <MobileLink key={l.to} to={l.to} label={l.label} />)}
              <div className="mt-3 pt-3 border-t border-earth-100">
                <MobileLink to="/potensi" label="Potensi" />
                <MobileLink to="/berita" label="Berita" />
                <MobileLink to="/galeri" label="Galeri" />
                <MobileLink to="/kontak" label="Kontak" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ to, label, solid }: { to: string; label: string; solid: boolean }) {
  return (
    <NavLink to={to} end className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? (solid ? "text-primary-700 bg-primary-50" : "text-white bg-white/15") : (solid ? "text-dusk-700 hover:bg-earth-50" : "text-white/85 hover:bg-white/10")}`}>
      {label}
    </NavLink>
  );
}

function MobileLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} end className={({ isActive }) => `px-3 py-2.5 rounded-lg text-[15px] font-medium ${isActive ? "text-primary-700 bg-primary-50" : "text-dusk-800"}`}>
      {label}
    </NavLink>
  );
}

function Dropdown({ label, links, solid, open, onToggle }: { label: string; links: { to: string; label: string }[]; solid: boolean; open: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <button onClick={onToggle} aria-expanded={open} className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${solid ? "text-dusk-700 hover:bg-earth-50" : "text-white/85 hover:bg-white/10"}`}>
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={onToggle} />
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-white shadow-soft-lg border border-earth-100/70 p-2 z-20">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "text-primary-700 bg-primary-50" : "text-dusk-700 hover:bg-earth-50"}`}>
                  {l.label}
                </NavLink>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
