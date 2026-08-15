"use client";

import { BANNER_LABELS, BANNER_ORDER, type BannerType } from "../domain/banner";

export interface BannerTabsProps {
  selected: BannerType;
  onSelect: (banner: BannerType) => void;
  /** Banner thumbnail image URLs (full character/weapon art). */
  icons?: Partial<Record<BannerType, string>>;
}

export function BannerTabs({ selected, onSelect, icons }: BannerTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Wish banner"
      className="flex flex-wrap gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-1"
    >
      {BANNER_ORDER.map((banner) => {
        const active = banner === selected;
        return (
          <button
            key={banner}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(banner)}
            className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-zinc-700 text-zinc-50"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {icons?.[banner] && (
              <img
                src={icons[banner]!}
                alt=""
                className="-ml-1 mr-2 h-9 w-auto rounded object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            {BANNER_LABELS[banner]}
          </button>
        );
      })}
    </div>
  );
}
