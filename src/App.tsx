import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import PageLoader from "./components/ui/PageLoader";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBerita from "./pages/admin/AdminBerita";
import AdminGaleri from "./pages/admin/AdminGaleri";
import AdminStruktur from "./pages/admin/AdminStruktur";
import AdminPotensi from "./pages/admin/AdminPotensi";
import AdminDataKependudukan from "./pages/admin/AdminDataKependudukan";

const Tentang = lazy(() => import("./pages/Tentang"));
const StrukturOrganisasi = lazy(() => import("./pages/StrukturOrganisasi"));
const DataKependudukan = lazy(() => import("./pages/DataKependudukan"));
const Potensi = lazy(() => import("./pages/Potensi"));
const Galeri = lazy(() => import("./pages/Galeri"));
const Berita = lazy(() => import("./pages/Berita"));
const BeritaDetail = lazy(() => import("./pages/BeritaDetail"));
const Peta = lazy(() => import("./pages/Peta"));
const Kontak = lazy(() => import("./pages/Kontak"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/berita" element={<ProtectedRoute><AdminBerita /></ProtectedRoute>} />
          <Route path="/admin/galeri" element={<ProtectedRoute><AdminGaleri /></ProtectedRoute>} />
          <Route path="/admin/struktur" element={<ProtectedRoute><AdminStruktur /></ProtectedRoute>} />
          <Route path="/admin/potensi" element={<ProtectedRoute><AdminPotensi /></ProtectedRoute>} />
          <Route path="/admin/data-kependudukan" element={<ProtectedRoute><AdminDataKependudukan /></ProtectedRoute>} />

          <Route
            path="*"
            element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tentang" element={<Tentang />} />
                    <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
                    <Route path="/data-kependudukan" element={<DataKependudukan />} />
                    <Route path="/potensi" element={<Potensi />} />
                    <Route path="/galeri" element={<Galeri />} />
                    <Route path="/berita" element={<Berita />} />
                    <Route path="/berita/:slug" element={<BeritaDetail />} />
                    <Route path="/peta" element={<Peta />} />
                    <Route path="/kontak" element={<Kontak />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}