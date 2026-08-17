"use client";

import { BANNER_LABELS, BANNER_ORDER, type BannerType } from "../domain/banner";
import { BANNER_ASSETS } from "../domain/banner-assets";

export interface BannerTabsProps {
  selected: BannerType;
  onSelect: (banner: BannerType) => void;
}

export function BannerTabs({ selected, onSelect }: BannerTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Wish banner"
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
                ? "mt-0 z-10 rounded-t-lg border-b-0 border-zinc-800 bg-zinc-900/60 font-bold text-zinc-50"
                : "mt-2 rounded-t-lg border-zinc-800 bg-zinc-950/70 font-medium text-zinc-400 hover:bg-zinc-950/60 hover:text-zinc-200"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
            <img
              src={BANNER_ASSETS[banner].icon}
              alt=""
              className="h-8 w-auto rounded object-contain"
            />
            <span className="truncate">{BANNER_LABELS[banner]}</span>
          </button>
        );
      })}
    </div>
  );
}