import { BANNER_LABELS, type BannerType } from "../domain/banner";
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
      className="grid grid-cols-2 gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:grid-cols-5"
    >
      <SummaryItem label="Banner" value={BANNER_LABELS[banner]} />
      <SummaryItem label="4★ Pity" value={`${pity4.currentPity} / 10`} />
      <SummaryItem label="5★ Pity" value={`${pity5.currentPity} / 90`} />
      <SummaryItem
        label="Next 5★"
        value={outcome.currentState === "guaranteed" ? "Guaranteed featured" : "50/50"}
      />
      <SummaryItem label="Total Wishes" value={String(total)} />
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-1 font-medium text-zinc-100">{value}</dd>
    </div>
  );
}

