"use client";

import { BANNER_ORDER, type BannerType } from "../domain/banner";
import { BANNER_ASSETS } from "../domain/banner-assets";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

export interface BannerTabsProps {
  selected: BannerType;
  onSelect: (banner: BannerType) => void;
}

export function BannerTabs({ selected, onSelect }: BannerTabsProps) {
  const { t } = useLanguage();

  return (
    <div
      role="tablist"
      aria-label={t("banner.tabsLabel")}
      className="grid grid-cols-3 gap-1 p-0"
    >
      {BANNER_ORDER.map((banner) => {
        const active = banner === selected;
        return (
          <button
            key={banner}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(banner)}
            className={`relative flex min-w-0 items-center justify-center gap-2 border px-2 py-2 text-sm transition-all ${
              active
                ? "mt-0 z-10 rounded-t-lg border-b-0 border-borders bg-bg-cards/60 font-bold text-text-black"
                : "mt-2 rounded-t-lg border-borders bg-tab-inactive-bg/80 font-medium text-text-black hover:bg-tab-inactive-bg hover:text-text-black"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
            <img
              src={BANNER_ASSETS[banner].icon}
              alt=""
              className="h-8 w-auto rounded object-contain"
            />
            <span className="truncate">
              {t(`banner.${banner}` as TranslationKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}