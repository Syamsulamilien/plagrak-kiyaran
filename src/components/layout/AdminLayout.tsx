import { Link, useLocation } from "react-router-dom";
import { BarChart3, Images, LayoutDashboard, LogOut, Newspaper, Sprout, Users2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard, end: true },
  { to: "/admin/berita", label: "Berita", icon: Newspaper },
  { to: "/admin/galeri", label: "Galeri", icon: Images },
  { to: "/admin/struktur", label: "Struktur Organisasi", icon: Users2 },
  { to: "/admin/potensi", label: "Potensi", icon: Sprout },
  { to: "/admin/data-kependudukan", label: "Data Kependudukan", icon: BarChart3 },
];;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session, signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-mist flex">
      <aside className="w-60 shrink-0 bg-dusk text-white/85 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <p className="font-display font-semibold text-white text-sm">Admin Plagrak Kiyaran</p>
          <p className="text-xs text-white/45 mt-0.5 truncate">{session?.user.email}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-primary-600 text-white" : "hover:bg-white/5 text-white/70"}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-xl text-sm text-white/60 hover:bg-white/5 transition-colors">
            ← Lihat Website
          </Link>
          <button onClick={signOut} className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 transition-colors">
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 sm:p-10">{children}</main>
    </div>
  );
}
