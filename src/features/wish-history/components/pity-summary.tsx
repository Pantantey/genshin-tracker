"use client";

import type { BannerType } from "../domain/banner";
import {
  BANNER_ASSETS,
  BANNER_FEATURED_ITEMS,
  getFeaturedItemUrl,
} from "../domain/banner-assets";
import type { RarityPityResult } from "../domain/pity";
import type { OutcomeResult } from "../domain/outcome";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

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

export function PitySummary({
  banner,
  pity4,
  pity5,
  outcome,
  total,
}: PitySummaryProps) {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t("summary.aria")}
      className={`flex flex-col items-center gap-6 p-4 sm:min-h-[432px] sm:flex-row sm:items-center ${
        banner === "weapon" ? "sm:gap-[116px]" : "sm:gap-8"
      }`}
    >
      <div className="relative shrink-0">
        {BANNER_ASSETS[banner].image2 ? (
          <div className="flex items-start gap-2 pl-[3em]">
            {/* eslint-disable-next-line @next/next/no-img-element -- local banner asset */}
            <img
              src={BANNER_ASSETS[banner].image}
              alt={t(`banner.${banner}` as TranslationKey)}
              className="h-[200px] w-[200px] max-w-full object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- local banner asset */}
            <img
              src={BANNER_ASSETS[banner].image2}
              alt=""
              className="h-[200px] w-[200px] max-w-full object-contain"
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- local banner asset
          <img
            src={BANNER_ASSETS[banner].image}
            alt={t(`banner.${banner}` as TranslationKey)}
            className="h-[400px] w-[540px] max-w-full object-contain"
          />
        )}
        {BANNER_FEATURED_ITEMS[banner].length > 0 && (
          <div
            aria-hidden="true"
            className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-3"
          >
            {BANNER_FEATURED_ITEMS[banner].map((slug) => (
              <span
                key={slug}
                title={slug}
                className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-rarity-4-star bg-bg-rarity-4-star/80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
                <img
                  src={getFeaturedItemUrl(banner, slug)}
                  alt=""
                  className="h-16 w-16 rounded-full object-cover"
                />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid w-full flex-1 grid-cols-1 divide-y divide-borders">

        <SummaryItem label={t("summary.pity4")} value={`${pity4.currentPity} / 10`} />
        <SummaryItem label={t("summary.pity5")} value={`${pity5.currentPity} / ${banner === "weapon" ? 80 : 90}`} />
        <SummaryItem
          label={t("summary.nextFive")}
          value={outcome.currentState === "guaranteed" ? t("summary.guaranteed") : t("summary.fiftyFifty")}
        />
        <SummaryItem label={t("summary.totalWishes")} value={String(total)} />
      </div>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <dt className="text-lg font-bold uppercase tracking-wide text-text-black">
        {label}
      </dt>
      <dd className="mt-1 text-base font-medium text-text-black">{value}</dd>
    </div>
  );
}
