import { useEffect, useState } from "react";
import { Building2, House, Trees, UserRound, type LucideIcon } from "lucide-react";
import CountUp from "../ui/CountUp";
import { FadeInStagger, FadeInStaggerItem } from "../ui/FadeIn";
import { supabase } from "../../lib/supabase";
import type { StatistikRingkas } from "../../types";

const iconMap: Record<string, LucideIcon> = { Users: UserRound, Home: House, MapPinned: Building2, Mountain: Trees };

export default function StatsSection() {
  const [data, setData] = useState<StatistikRingkas[]>([]);

  useEffect(() => {
    supabase.from("statistik_ringkas").select("*").then(({ data }) => setData(data ?? []));
  }, []);

  if (data.length === 0) return null;

  return (
    <section className="relative z-20 -mt-16 sm:-mt-20 px-5 sm:px-8">
      <FadeInStagger className="container-site !px-0 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 card-surface p-5 sm:p-7">
        {data.map((s) => {
          const Icon = iconMap[s.icon] ?? Trees;
          return (
            <FadeInStaggerItem key={s.label} className="flex flex-col items-center text-center gap-2 sm:gap-2.5">
              <span className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
              </span>
              <div>
                <p className="text-xl sm:text-3xl font-display font-bold text-dusk-800 leading-none">
                  <CountUp value={s.nilai} suffix={s.satuan === "Ha" ? " Ha" : ""} />
                </p>
                <p className="mt-1 text-xs sm:text-sm text-dusk-700/60">{s.label}{s.satuan !== "Ha" ? ` (${s.satuan})` : ""}</p>
              </div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </section>
  );
}