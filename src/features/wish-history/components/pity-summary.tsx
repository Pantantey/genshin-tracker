"use client";

import Link from "next/link";
import type { BannerType } from "../domain/banner";
import {
  BANNER_ASSETS,
  BANNER_FEATURED_ITEMS,
  getFeaturedItemUrl,
} from "../domain/banner-assets";
import { CHARACTER_BANNER_NAME } from "../domain/banner-names";
import { WEAPON_BANNER_NAME } from "../domain/banner-names";
import { WEAPON_BANNER_NAME_2 } from "../domain/banner-names";
import { getWeaponBannerDisplayName } from "../domain/banner-names";
import { getCharacterInfo } from "@/features/builds/domain/characters";
import { getCharacterBuildUrl } from "@/features/builds/domain/characters";
import { getElementIcon } from "@/features/builds/domain/build-icons";
import { getWeaponTypeIcon } from "@/features/builds/domain/build-icons";
import { getWeaponNameKey } from "@/features/builds/domain/build-icons";
import { capitalizeName } from "../domain/format";
import type { RarityPityResult } from "../domain/pity";
import type { OutcomeResult } from "../domain/outcome";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

/** Localized display name for a Weapon banner weapon slug. */
function localizeWeaponBannerName(
  slug: string,
  t: (key: TranslationKey) => string
): string {
  const english = getWeaponBannerDisplayName(slug);
  const key = getWeaponNameKey(english);
  return key ? t(key as TranslationKey) : english;
}

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
        {banner === "character" && (
          <div className="mb-3 flex items-center justify-center gap-3">
            <CharacterBannerHeading />
          </div>
        )}
        {BANNER_ASSETS[banner].image2 ? (
          <div className="flex items-start gap-2 pl-[3em]">
            <div className="flex w-[200px] flex-col items-center gap-1">
              <p className="truncate text-sm font-semibold text-text-black">
                {localizeWeaponBannerName(WEAPON_BANNER_NAME, t)}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element -- local banner asset */}
              <img
                src={BANNER_ASSETS[banner].image}
                alt=""
                className="h-[200px] w-[200px] max-w-full object-contain"
              />
            </div>
            <div className="flex w-[200px] flex-col items-center gap-1">
              <p className="truncate text-sm font-semibold text-text-black">
                {localizeWeaponBannerName(WEAPON_BANNER_NAME_2, t)}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element -- local banner asset */}
              <img
                src={BANNER_ASSETS[banner].image2}
                alt=""
                className="h-[200px] w-[200px] max-w-full object-contain"
              />
            </div>
          </div>
        ) : banner === "character" ? (
          <Link href={`/builds/${CHARACTER_BANNER_NAME}`} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element -- local banner asset */}
            <img
              src={BANNER_ASSETS[banner].image}
              alt={t(`banner.${banner}` as TranslationKey)}
              className="h-[400px] w-[540px] max-w-full object-contain transition-transform hover:scale-[1.02]"
            />
          </Link>
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
            {BANNER_FEATURED_ITEMS[banner].map((slug) => {
              const circle = (
                <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-rarity-4-star bg-bg-rarity-4-star/80">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
                  <img
                    src={getFeaturedItemUrl(banner, slug)}
                    alt=""
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </span>
              );
              // Only the Character banner's featured 4★ open their build page.
              const buildUrl = getCharacterBuildUrl(slug);
              const displayName = capitalizeName(slug);
              return banner === "character" && buildUrl ? (
                <Link
                  key={slug}
                  href={buildUrl}
                  title={displayName}
                  className="block transition-transform hover:scale-105"
                >
                  {circle}
                </Link>
              ) : (
                <span key={slug} title={displayName} className="block">
                  {circle}
                </span>
              );
            })}
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

/**
 * Heading shown above the Character banner image on the home page: the featured
 * character's name with its element icon on the left and weapon-type icon on
 * the right, matching the Character tab of the per-character build page.
 */
function CharacterBannerHeading() {
  const { t } = useLanguage();
  const character = getCharacterInfo(CHARACTER_BANNER_NAME);
  if (!character) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
      <img
        src={getElementIcon(character.element)}
        alt={t(`element.${character.element}` as TranslationKey)}
        title={t(`element.${character.element}` as TranslationKey)}
        className="element-icon h-8 w-8 shrink-0 object-contain"
      />
      <h2 className="text-2xl font-semibold text-text-black">
        {character.name}
      </h2>
      {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
      <img
        src={getWeaponTypeIcon(character.weaponType)}
        alt={t(`weapon.${character.weaponType}` as TranslationKey)}
        title={t(`weapon.${character.weaponType}` as TranslationKey)}
        className="element-icon h-8 w-8 shrink-0 object-contain"
      />
    </>
  );
}
