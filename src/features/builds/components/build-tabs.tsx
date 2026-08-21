"use client";

import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

/** The four tabs of a character build page. */
export type BuildTab = "character" | "weapons" | "artifacts" | "talents";

export interface BuildTabsProps {
  selected: BuildTab;
  onSelect: (tab: BuildTab) => void;
}

/**
 * Folder-style tabs for the build page, matching the banner tabs look
 * (active tab merges with the card below via `rounded-t-lg border-b-0`).
 */
export function BuildTabs({ selected, onSelect }: BuildTabsProps) {
  const { t } = useLanguage();

  const TABS: { id: BuildTab; labelKey: TranslationKey }[] = [
    { id: "character", labelKey: "builds.tab.character" },
    { id: "weapons", labelKey: "builds.tab.weapons" },
    { id: "artifacts", labelKey: "builds.tab.artifacts" },
    { id: "talents", labelKey: "builds.tab.talents" },
  ];

  return (
    <div
      role="tablist"
      aria-label={t("builds.tabsLabel")}
      className="grid grid-cols-4 gap-1"
    >
      {TABS.map((tab) => {
        const active = tab.id === selected;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(tab.id)}
            className={`flex min-w-0 items-center justify-center gap-2 border px-2 py-2 text-sm transition-all ${
              active
                ? "mt-0 z-10 rounded-t-lg border-b-0 border-borders bg-bg-cards/60 font-bold text-text-black"
                : "mt-2 rounded-t-lg border-borders bg-tab-inactive-bg/80 font-medium text-text-black hover:bg-tab-inactive-bg hover:text-text-black"
            }`}
          >
            <span className="truncate">{t(tab.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
}