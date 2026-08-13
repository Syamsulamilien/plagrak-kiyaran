import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import FadeIn from "../components/ui/FadeIn";
import Button from "../components/ui/Button";

export default function Kontak() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari Website — ${form.nama || "Warga"}`);
    const body = encodeURIComponent(`${form.pesan}\n\n— ${form.nama} (${form.email})`);
    window.location.href = `mailto:plagrakkiyaran@wukirsari.desa.id?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <PageHero eyebrow="Hubungi Kami" title="Kontak Pedukuhan" description="Sampaikan pertanyaan, masukan, atau laporan Anda kepada perangkat Pedukuhan Plagrak Kiyaran." breadcrumb="Kontak" />

      <section className="py-16 sm:py-24">
        <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            {[
              { icon: MapPin, label: "Alamat", value: "Pedukuhan Plagrak Kiyaran, Wukirsari, Cangkringan, Sleman, DIY" },
              { icon: Phone, label: "Telepon / WhatsApp", value: "0812-xxxx-xxxx" },
              { icon: Mail, label: "Email", value: "plagrakkiyaran@wukirsari.desa.id" },
              { icon: Clock, label: "Jam Pelayanan", value: "Senin–Jumat 08.00–15.00, Sabtu 08.00–12.00" },
            ].map((c) => (
              <FadeIn key={c.label} className="flex gap-4 card-surface p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700"><c.icon className="h-5 w-5" /></span>
                <div><p className="text-xs font-semibold uppercase tracking-wide text-dusk-700/50">{c.label}</p><p className="mt-1 text-sm font-medium text-dusk-800">{c.value}</p></div>
              </FadeIn>
            ))}
            <FadeIn className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button href="https://wa.me/62812xxxxxxx" size="lg" className="flex-1 justify-center"><MessageCircle className="h-4 w-4" />Hubungi via WhatsApp</Button>
              <Button to="/peta" variant="secondary" size="lg" className="flex-1 justify-center"><MapPin className="h-4 w-4" />Lihat Lokasi</Button>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className="text-sm font-medium text-dusk-800">Nama</label><input required type="text" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="input-field mt-1.5" placeholder="Nama lengkap" /></div>
                <div><label className="text-sm font-medium text-dusk-800">Email</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field mt-1.5" placeholder="nama@email.com" /></div>
              </div>
              <div><label className="text-sm font-medium text-dusk-800">Pesan</label><textarea required rows={5} value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} className="input-field mt-1.5 resize-none" placeholder="Tulis pertanyaan atau masukan Anda..." /></div>
              <Button type="submit" size="lg" className="w-full justify-center"><Send className="h-4 w-4" />Kirim Pesan</Button>
              <p className="text-xs text-dusk-700/45 text-center">Pesan akan dikirim melalui aplikasi email default perangkat Anda.</p>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
