import {
  CHARACTERS_DATA,
  type Element,
  type RecommendedStats,
  type WeaponType,
} from "../data/characters-data";
import {
  getWeaponData,
  type WeaponData,
} from "../data/weapons-data";
import {
  getArtifactData,
  type ArtifactData,
} from "../data/artifacts-data";
import { slugifyName } from "../../wish-history/domain/item-icons";

/**
 * Builds feature — character registry.
 *
 * The source of truth for per-character build data (name, element, weapon type,
 * recommended weapons) is `characters-data.ts`. This module derives the full
 * portraits path and exposes lookups for the UI. The slug used in URLs/assets
 * must match a `slug` in `characters-data.ts`.
 */

/** A resolved artifact set: its images plus the 2/4-piece bonus texts. */
export interface ArtifactSlot {
  /** i18n key for the display name of this artifact set. */
  nameKey: string;
  files: string[];
  twoPieceBonus: string;
  fourPieceBonus: string;
}

export interface CharacterInfo {
  /** Stable lowercase slug, e.g. "hu_tao" — used in URLs and asset paths. */
  slug: string;
  /** Human (display) name. */
  name: string;
  /** Rarity as a string, e.g. "5" or "4". */
  rarity: string;
  element: Element;
  weaponType: WeaponType;
  /** Recommended weapons, resolved to their full data. */
  weapons: WeaponData[];
  /** 1 or 2 resolved artifact sets (images + set bonuses). */
  artifactSets: ArtifactSlot[];
  /** Text under the Sands artifact icon. */
  sandStat: string;
  /** Text under the Goblet artifact icon. */
  gobletStat: string;
  /** Text under the Circlet artifact icon. */
  circletStat: string;
  /** Text under the "PRIORITY STATS" heading. */
  priorityStats: string;
  /** Cells for the "RECOMMENDED STATS" 2x2 grid. */
  recommendedStats: RecommendedStats;
  /** Editable level shown next to the "Normal attack" talent. */
  normalAttackLevel: string;
  /** Editable level shown next to the "Elemental Skill" talent. */
  elementalSkillLevel: string;
  /** Editable level shown next to the "Ultimate" talent. */
  ultimateLevel: string;
  /** Full portrait asset path. */
  image: string;
  /** Whether the full build data is available for this character. */
  available: boolean;
}

function toCharacterInfo(data: (typeof CHARACTERS_DATA)[number]): CharacterInfo {
  const weapons = data.weapons
    .map((name) => getWeaponData(name))
    .filter((w): w is WeaponData => Boolean(w));
  const artifactSets: ArtifactSlot[] = data.artifact
    .map((key) => getArtifactData(key))
    .filter((a): a is ArtifactData => Boolean(a))
    .map((a) => ({
      nameKey: a.nameKey,
      files: a.files,
      twoPieceBonus: a.twoPieceBonus,
      fourPieceBonus: a.fourPieceBonus,
    }));

  return {
    slug: data.slug,
    name: data.name,
    rarity: data.rarity,
    element: data.element,
    weaponType: data.weaponType,
    weapons,
    artifactSets,
    sandStat: data.sandStat,
    gobletStat: data.gobletStat,
    circletStat: data.circletStat,
    priorityStats: data.priorityStats,
    recommendedStats: data.recommendedStats,
    normalAttackLevel: data.normalAttackLevel,
    elementalSkillLevel: data.elementalSkillLevel,
    ultimateLevel: data.ultimateLevel,
    image: `/full/characters/${data.slug}.png`,
    available: data.available,
  };
}

/** All characters, in catalog order. */
export function getAllCharacters(): CharacterInfo[] {
  return CHARACTERS_DATA.map(toCharacterInfo);
}

/** Lookup by slug (used by `/builds/[slug]`). Returns undefined for unknown slugs. */
export function getCharacterInfo(slug: string): CharacterInfo | undefined {
  const data = CHARACTERS_DATA.find((character) => character.slug === slug);
  return data ? toCharacterInfo(data) : undefined;
}

/** The recommended weapons for a character, or undefined for an unknown slug. */
export function getCharacterWeapons(slug: string): WeaponData[] | undefined {
  const character = getCharacterInfo(slug);
  return character?.weapons;
}

/**
 * Resolve the builds page URL for a wish item name, or `null` when the item is
 * not a known character (weapons and unknown names return null). Used to make
 * wish-history rows and pull circles link to their character build page.
 */
export function getCharacterBuildUrl(name: string): string | null {
  if (!name) {
    return null;
  }
  const slug = slugifyName(name);
  return CHARACTERS_DATA.some((character) => character.slug === slug)
    ? `/builds/${slug}`
    : null;
}