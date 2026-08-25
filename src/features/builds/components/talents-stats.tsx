import { useState } from "react";
import type { CharacterInfo } from "../domain/characters";
import {
  getTalentIcon,
  getWeaponTypeIcon,
} from "../domain/build-icons";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

/** Entries rendered as the three talent-level rows. */
interface TalentRow {
  labelKey: TranslationKey;
  level: string;
  iconUrl: string;
  iconAlt: string;
}

/**
 * "Talents" panel: a centered "TALENTS LEVELS" title followed by three rows
 * (Normal attack, Elemental Skill, Ultimate). Each row shows an icon on the
 * left, its label, and an editable level value on the right.
 */
export function TalentsStats({ character }: { character: CharacterInfo }) {
  const { t } = useLanguage();

  const rows: TalentRow[] = [
    {
      labelKey: "builds.talentNormal",
      level: character.normalAttackLevel,
      iconUrl: getWeaponTypeIcon(character.weaponType),
      iconAlt: t("builds.talentNormal" as TranslationKey),
    },
    {
      labelKey: "builds.talentElemental",
      level: character.elementalSkillLevel,
      iconUrl: getTalentIcon(character.slug, "elemental"),
      iconAlt: t("builds.talentElemental" as TranslationKey),
    },
    {
      labelKey: "builds.talentUltimate",
      level: character.ultimateLevel,
      iconUrl: getTalentIcon(character.slug, "burst"),
      iconAlt: t("builds.talentUltimate" as TranslationKey),
    },
  ];

  return (
    <div className="space-y-6 p-4 my-5">
      <h2 className="text-center text-lg font-bold uppercase tracking-wide text-text-black">
        {t("builds.talentsTitle")}
      </h2>

      <div className="flex flex-col items-center space-y-4">
        {rows.map((row) => (
          <TalentRowView key={row.labelKey} row={row} />
        ))}
      </div>
    </div>
  );
}

/** One talent row: fallback icon (black circle) when the asset does not exist. */
function TalentRowView({ row }: { row: TalentRow }) {
  const { t } = useLanguage();
  const [missing, setMissing] = useState(false);

  return (
    <div className="flex w-1/2 items-center gap-4 rounded-lg border border-borders bg-bg-cards/50 p-4">
      {missing ? (
        <BlackCircle />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- local static asset
        <img
          src={row.iconUrl}
          alt={row.iconAlt}
          onError={() => setMissing(true)}
          className="talent-icon h-16 w-16 shrink-0 rounded-md object-contain"
        />
      )}

      <p className="font-semibold text-text-black">
        {t(row.labelKey as TranslationKey)}
      </p>

      <p className="ml-auto pe-4 font-medium text-text-black">{row.level}</p>
    </div>
  );
}

/** Fallback shown when a talent icon file is absent. */
function BlackCircle() {
  return (
    <span
      aria-hidden="true"
      className="h-16 w-16 shrink-0 rounded-full bg-black"
    />
  );
}