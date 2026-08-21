"use client";

import { useState } from "react";
import type { CharacterInfo } from "../domain/characters";
import type { WeaponData } from "../data/characters-data";
import {
  getElementIcon,
  getWeaponTypeIcon,
} from "../domain/build-icons";
import { BuildTabs, type BuildTab } from "./build-tabs";
import { BestWeapons } from "./best-weapons";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

/**
 * The character build detail inside the banner-like box. "Character" shows the
 * full portrait with name / element / weapon type on the right, and "Best
 * Weapons" shows the recommended weapons. The other tabs are placeholders.
 */
export function CharacterDetail({
  character,
  weapons,
}: {
  character: CharacterInfo;
  weapons: WeaponData[];
}) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<BuildTab>("character");

  return (
    <div>
      {character.available && (
        <BuildTabs selected={tab} onSelect={setTab} />
      )}
      <div className="overflow-hidden rounded-b-xl border border-borders border-t-0 bg-bg-cards/60">
        {!character.available ? (
          <ComingSoon character={character} />
        ) : (
          <>
            {tab === "character" && (
              <div className="flex flex-col items-center">
                {/* Name with element icon (left) and weapon type icon (right) */}
                <div className="flex items-center gap-3 pb-4 pt-6">
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
                    className="h-8 w-8 shrink-0 object-contain"
                  />
                </div>

                {/* Full portrait, centered, natural size (height-capped) */}
                {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
                <img
                  src={character.image}
                  alt={character.name}
                  className="max-h-[520px] w-auto object-contain"
                />
              </div>
            )}

            {tab === "weapons" && <BestWeapons weapons={weapons} />}

            {(tab === "artifacts" || tab === "talents") && (
              <div className="min-h-[240px]" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/** Non-available placeholder: full portrait on the left, "Coming soon" on the right. */
function ComingSoon({ character }: { character: CharacterInfo }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
      <img
        src={character.image}
        alt={character.name}
        className="h-[360px] w-auto max-w-full object-contain sm:w-1/2"
      />
      <p className="text-2xl font-semibold text-text-black sm:w-1/2 sm:text-center">
        {t("builds.comingSoon")}
      </p>
    </div>
  );
}
