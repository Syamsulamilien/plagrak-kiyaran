import { Compass } from "lucide-react";
import FadeIn from "../components/ui/FadeIn";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <FadeIn className="text-center px-6">
        <span className="flex h-16 w-16 mx-auto items-center justify-center rounded-3xl bg-primary-50 text-primary-700"><Compass className="h-8 w-8" /></span>
        <p className="mt-6 font-display text-6xl font-bold text-primary-700">404</p>
        <h1 className="mt-2 text-xl sm:text-2xl font-display font-semibold text-dusk-800">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-dusk-700/60 max-w-sm mx-auto">Sepertinya jalan setapak ini belum kami petakan. Mari kembali ke beranda.</p>
        <Button to="/" size="lg" icon className="mt-7">Kembali ke Beranda</Button>
      </FadeIn>
    </section>
  );
}
