import { useEffect, useState } from "react";
import { Cloud, Compass, Sprout, Target, ThermometerSun, TrendingUp } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import FadeIn, { FadeInStagger, FadeInStaggerItem } from "../components/ui/FadeIn";
import Button from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import type { KondisiAlam } from "../types";

export default function Tentang() {
  const [kondisiAlam, setKondisiAlam] = useState<KondisiAlam | null>(null);

  useEffect(() => {
    supabase.from("kondisi_alam").select("*").limit(1).maybeSingle().then(({ data }) => setKondisiAlam(data));
  }, []);

  return (
    <>
      <PageHero eyebrow="Profil Pedukuhan" title="Tentang Plagrak Kiyaran" description="Mengenal lebih dekat sejarah, arah, dan kondisi wilayah dusun kami di lereng selatan Gunung Merapi." breadcrumb="Tentang Pedukuhan" />

      <section className="py-20 sm:py-28">
        <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Asal Usul" title="Sejarah Pedukuhan" />
          </div>
          <div className="lg:col-span-7 space-y-4 text-dusk-700/80 leading-relaxed">
            <FadeIn>
              <p>Pedukuhan Plagrak Kiyaran merupakan salah satu wilayah di Kalurahan Wukirsari, Kapanewon Cangkringan, yang sejak awal berkembang sebagai kawasan agraris di kaki Gunung Merapi. Nama &quot;Kiyaran&quot; telah lama melekat sebagai identitas pedukuhan bagian dari Wukirsari, wilayah yang terbentuk dari penggabungan beberapa kelurahan lama pada era pasca-kemerdekaan.</p>
              <p>Letaknya di lereng bagian selatan Merapi menjadikan tanah di wilayah ini subur dan cocok untuk pertanian bertingkat (terasering) maupun perkebunan salak. Kehidupan warga sejak dulu tidak lepas dari siklus bertani, beternak, dan gotong royong menjaga lingkungan dari ancaman bencana lereng gunung berapi.</p>
              <p>Hingga kini, semangat kekeluargaan dan gotong royong tersebut masih terus dijaga dan diwariskan antar generasi, menjadikan Plagrak Kiyaran sebagai dusun yang guyub sekaligus produktif secara pertanian.</p>
              <p className="text-sm text-dusk-700/50 italic">*Narasi sejarah di atas adalah contoh awal — lengkapi dengan data dan cerita asli dari sesepuh serta perangkat pedukuhan.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-mist">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="Arah Pedukuhan" title="Visi & Misi" description="Landasan cita-cita bersama dalam membangun Plagrak Kiyaran yang mandiri dan sejahtera." />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn className="card-surface p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white"><Compass className="h-6 w-6" /></span>
              <h3 className="mt-5 text-xl font-display font-semibold text-dusk-800">Visi</h3>
              <p className="mt-3 text-dusk-700/75 leading-relaxed">Mewujudkan Pedukuhan Plagrak Kiyaran yang mandiri secara pertanian, guyub dalam bermasyarakat, dan lestari dalam menjaga lingkungan lereng Merapi.</p>
            </FadeIn>
            <FadeIn delay={0.1} className="card-surface p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-earth-400 text-white"><Target className="h-6 w-6" /></span>
              <h3 className="mt-5 text-xl font-display font-semibold text-dusk-800">Misi</h3>
              <ul className="mt-3 space-y-2.5 text-dusk-700/75 leading-relaxed list-none">
                {["Mengembangkan potensi pertanian dan UMKM warga secara berkelanjutan", "Menguatkan gotong royong dan kelembagaan dusun", "Meningkatkan kualitas kesehatan, pendidikan, dan kesiapsiagaan bencana", "Melestarikan budaya dan lingkungan lereng Merapi"].map((m) => (
                  <li key={m} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />{m}</li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <SectionHeading eyebrow="Wilayah" title="Letak Geografis" description="Pedukuhan Plagrak Kiyaran berada di Kalurahan Wukirsari, Kapanewon Cangkringan, Kabupaten Sleman, Daerah Istimewa Yogyakarta — pada lereng bagian selatan Gunung Merapi, diapit oleh Sungai Gendol dan Sungai Kuning." />
            <p className="mt-5 text-sm text-dusk-700/60 leading-relaxed">Berjarak sekitar 5 km sebelah barat pusat Kapanewon Cangkringan dan sekitar 17 km sebelah timur pusat Kabupaten Sleman, dengan aksesibilitas jalan yang baik menghubungkan ke wilayah sekitarnya.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card-surface p-6 sm:p-8">
              <div className="relative mx-auto aspect-square max-w-xs">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-28 w-28 rounded-2xl bg-primary-600 text-white flex flex-col items-center justify-center text-center px-3">
                    <span className="text-xs font-semibold leading-tight">Plagrak Kiyaran</span>
                  </div>
                </div>
                {[
                  { label: "Utara", isi: "Wilayah Kalurahan Umbulharjo", pos: "top-0 left-1/2 -translate-x-1/2" },
                  { label: "Selatan", isi: "Pedukuhan lain di Wukirsari", pos: "bottom-0 left-1/2 -translate-x-1/2" },
                  { label: "Timur", isi: "Sungai Gendol", pos: "top-1/2 right-0 -translate-y-1/2" },
                  { label: "Barat", isi: "Sungai Kuning", pos: "top-1/2 left-0 -translate-y-1/2" },
                ].map((b) => (
                  <div key={b.label} className={`absolute ${b.pos} w-32 text-center`}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{b.label}</p>
                    <p className="text-[11px] text-dusk-700/55 leading-snug mt-0.5">{b.isi}</p>
                  </div>
                ))}
              </div>
              {/* <p className="mt-6 text-center text-xs text-dusk-700/45 italic">*Batas wilayah bersifat contoh — sesuaikan dengan data administratif resmi pedukuhan.</p> */}
            </div>
          </FadeIn>
        </div>
      </section>

      {kondisiAlam && (
        <section className="py-20 sm:py-28 bg-dusk">
          <div className="container-site">
            <SectionHeading tone="dark" eyebrow="Alam & Iklim" title="Kondisi Alam" description="Karakter tanah dan iklim yang membentuk kehidupan agraris warga Plagrak Kiyaran." />
            <FadeInStagger className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[{ icon: Compass, label: "Ketinggian", value: kondisiAlam.ketinggian }, { icon: Cloud, label: "Curah Hujan", value: kondisiAlam.curah_hujan }, { icon: ThermometerSun, label: "Suhu Rata-rata", value: kondisiAlam.suhu }].map((k) => (
                <FadeInStaggerItem key={k.label} className="rounded-3xl bg-white/5 border border-white/10 p-6">
                  <k.icon className="h-6 w-6 text-gold-400" />
                  <p className="mt-4 text-2xl font-display font-bold text-white">{k.value}</p>
                  <p className="mt-1 text-sm text-white/55">{k.label}</p>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
            <FadeIn delay={0.2}><p className="mt-8 max-w-3xl text-white/65 leading-relaxed">{kondisiAlam.topografi}</p></FadeIn>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-24">
        <div className="container-site text-center">
          <FadeIn>
            <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-gold-100 text-gold-700"><Sprout className="h-7 w-7" /></span>
            <h2 className="mt-5 text-2xl sm:text-3xl font-display font-bold text-dusk-800">Ingin tahu potensi wilayah kami secara lengkap?</h2>
            <p className="mt-3 text-dusk-700/65 max-w-lg mx-auto">Dari sawah terasering hingga peternakan warga — jelajahi kekayaan Plagrak Kiyaran.</p>
            <Button to="/potensi" size="lg" icon className="mt-7"><TrendingUp className="h-4 w-4" />Lihat Potensi Pedukuhan</Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}