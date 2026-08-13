import Hero from "../components/sections/Hero";
import StatsSection from "../components/sections/StatsSection";
import TentangSingkat from "../components/sections/TentangSingkat";
import PotensiPreview from "../components/sections/PotensiPreview";
import GaleriPreview from "../components/sections/GaleriPreview";
import CtaBanner from "../components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <TentangSingkat />
      <PotensiPreview />
      <GaleriPreview />
      <CtaBanner />
    </>
  );
}
