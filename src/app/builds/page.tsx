"use client";

import { useState } from "react";
import { getAllCharacters } from "@/features/builds/domain/characters";
import { CharacterCard } from "@/features/builds/components/character-card";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

const ELEMENTS = [
  "anemo",
  "cryo",
  "dendro",
  "electro",
  "geo",
  "hydro",
  "pyro",
] as const;

const WEAPON_TYPES = [
  "bow",
  "catalyst",
  "claymore",
  "polearm",
  "sword",
] as const;

export default function BuildsPage() {
  const { t } = useLanguage();

  const [element, setElement] = useState<string | null>(null);
  const [weapon, setWeapon] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const characters = getAllCharacters().filter((c) => c.available);

  const filteredCharacters = characters.filter((character) => {
    if (element && character.element !== element) return false;
    if (weapon && character.weaponType !== weapon) return false;
    if (query.trim()) {
      return character.name.toLowerCase().includes(query.trim().toLowerCase());
    }
    return true;
  });

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <h1 className="text-2xl font-semibold text-text-black">
        {t("builds.title")}
      </h1>

      <div className="mt-4 rounded-lg border border-borders bg-bg-cards/50 p-3">
        {/* Row 1 — Element filter */}
        <div
          role="group"
          aria-label={t("builds.filterElement")}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-text-black">
            {t("builds.filterElement")}
          </span>
          <FilterButton
            label={t("builds.all")}
            icon={null}
            active={element === null}
            onSelect={() => setElement(null)}
          />
          {ELEMENTS.map((el) => (
            <FilterButton
              key={el}
              label={t(`element.${el}` as TranslationKey)}
              icon={`/icons/elements/Element_${el.charAt(0).toUpperCase()}${el.slice(1)}.png`}
              active={element === el}
              onSelect={() => setElement(el)}
            />
          ))}
        </div>

        {/* Row 2 — Weapon type filter + name search */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-black">
            {t("builds.filterWeapon")}
          </span>
          <FilterButton
            label={t("builds.all")}
            icon={null}
            active={weapon === null}
            onSelect={() => setWeapon(null)}
          />
          {WEAPON_TYPES.map((wt) => (
            <FilterButton
              key={wt}
              label={t(`weapon.${wt}` as TranslationKey)}
              icon={`/icons/weapon-types/Icon_${wt.charAt(0).toUpperCase()}${wt.slice(1)}.png`}
              active={weapon === wt}
              onSelect={() => setWeapon(wt)}
            />
          ))}
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("builds.search")}
            aria-label={t("builds.search")}
            className="ml-auto w-full rounded-md border border-borders bg-bg-cards px-3 py-1.5 text-sm text-text-black placeholder:text-placeholder focus:border-placeholder focus:outline-none sm:w-56"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {filteredCharacters.length === 0 ? (
          <p className="col-span-full text-sm text-text-black">
            {t("builds.empty")}
          </p>
        ) : (
          filteredCharacters.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))
        )}
      </div>
    </main>
  );
}

function FilterButton({
  label,
  icon,
  active,
  onSelect,
}: {
  label: string;
  icon: string | null;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-bg-button text-text-white"
          : "border-borders text-text-black hover:bg-borders hover:text-text-black"
      }`}
    >
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element -- local static asset
        <img src={icon} alt="" className="h-4 w-4 object-contain" />
      )}
      <span>{label}</span>
    </button>
  );
}