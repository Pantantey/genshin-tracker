"use client";

import { getWeaponIcon } from "../domain/build-icons";
import type { WeaponData } from "../data/weapons-data";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

/** Render a row of 3, 4 or 5 stars. */
function Stars({ count }: { count: 3 | 4 | 5 }) {
  return (
    <span aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

/**
 * "Best Weapons" panel: one row per recommended weapon, laid out in three
 * columns — name + stars, weapon icon, then damage/description. The first
 * weapon is highlighted as the best option (orange border + animated badge).
 */
export function BestWeapons({ weapons }: { weapons: WeaponData[] }) {
  const { t } = useLanguage();

  if (weapons.length === 0) {
    return <div className="min-h-[240px] p-4" />;
  }

  return (
    <ul className="space-y-4 p-4">
      {weapons.map((weapon, index) => {
        const icon = getWeaponIcon(weapon.name);
        const isFirst = index === 0;
        return (
          <li
            key={`${weapon.name}-${index}`}
            className={`relative grid grid-cols-1 items-center gap-4 rounded-lg border py-4 px-25 sm:grid-cols-[6fr_3fr_11fr] ${
              isFirst
                ? "border-2 border-border-5-star bg-bg-cards/50"
                : "border border-borders bg-bg-cards/50"
            }`}
          >
            {isFirst && (
              <span className="best-option-badge absolute left-[-10px] top-3.5 z-10 rounded bg-border-5-star px-2 py-0.5 text-xs font-bold text-text-black">
                {t("builds.bestOption" as TranslationKey)}
              </span>
            )}

            {/* Column 1 — name + stars */}
            <div className="text-center">
              <p className="font-semibold text-text-black">
                {t(weapon.nameKey as TranslationKey)}
              </p>
              <div className="mt-1 text-rarity-5-star">
                <Stars count={weapon.stars} />
              </div>
            </div>

            {/* Column 2 — weapon icon */}
            <div className="flex justify-center pe-4">
              {icon ? (
                // eslint-disable-next-line @next/next/no-img-element -- local static asset
                <img
                  src={icon}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
              ) : (
                <span className="text-xs text-text-black">—</span>
              )}
            </div>

            {/* Column 3 — main damage / secondary / description */}
            <div className="space-y-1 text-left">
              <p className="text-base font-bold text-text-black">
                {t(weapon.mainStat as TranslationKey)}
              </p>
              <p className="text-sm text-text-black">
                {t(weapon.secondaryStat as TranslationKey)}
              </p>
              <p className="text-sm text-text-black/80">
                {t(weapon.description as TranslationKey)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}