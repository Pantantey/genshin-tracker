import { BANNER_LABELS, type BannerType } from "../domain/banner";
import { BANNER_ASSETS } from "../domain/banner-assets";
import type { RarityPityResult } from "../domain/pity";
import type { OutcomeResult } from "../domain/outcome";

export interface PitySummaryProps {
  banner: BannerType;
  /** Independent 4-star pity counter. */
  pity4: RarityPityResult;
  /** Independent 5-star pity counter. */
  pity5: RarityPityResult;
  outcome: OutcomeResult;
  /** Total stored wishes for this banner (diagnostic + comparison with the game). */
  total: number;
}

export function PitySummary({ banner, pity4, pity5, outcome, total }: PitySummaryProps) {
  return (
    <section
      aria-label="Summary"
      className="flex flex-col items-center gap-6 p-4 sm:flex-row sm:items-center sm:gap-8"
    >
      <div className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- local banner asset */}
        <img
          src={BANNER_ASSETS[banner].image}
          alt={BANNER_LABELS[banner]}
          className="w-[270px] h-[200px] max-w-full object-contain"
        />
      </div>

      <div className="grid w-full flex-1 grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8">
        <SummaryItem label="4★ Pity" value={`${pity4.currentPity} / 10`} />
        <SummaryItem label="5★ Pity" value={`${pity5.currentPity} / ${banner === "weapon" ? 80 : 90}`} />
        <SummaryItem
          label="Next 5★"
          value={outcome.currentState === "guaranteed" ? "Guaranteed featured" : "50/50"}
        />
        <SummaryItem label="Total Wishes" value={String(total)} />
      </div>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-1 font-medium text-zinc-100">{value}</dd>
    </div>
  );
}
