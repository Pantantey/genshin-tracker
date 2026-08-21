import {
  CHARACTERS_DATA,
  type Element,
  type WeaponData,
  type WeaponType,
} from "../data/characters-data";
import { slugifyName } from "../../wish-history/domain/item-icons";

/**
 * Builds feature — character registry.
 *
 * The source of truth for per-character build data (name, element, weapon type,
 * recommended weapons) is `characters-data.ts`. This module derives the full
 * portraits path and exposes lookups for the UI. The slug used in URLs/assets
 * must match a `slug` in `characters-data.ts`.
 */

export interface CharacterInfo {
  /** Stable lowercase slug, e.g. "hu_tao" — used in URLs and asset paths. */
  slug: string;
  /** Display name (from the data file). */
  name: string;
  element: Element;
  weaponType: WeaponType;
  /** Full portrait asset path. */
  image: string;
  /** Whether the full build data is available for this character. */
  available: boolean;
}

function toCharacterInfo(data: (typeof CHARACTERS_DATA)[number]): CharacterInfo {
  return {
    slug: data.slug,
    name: data.name,
    element: data.element,
    weaponType: data.weaponType,
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
  return CHARACTERS_DATA.find((character) => character.slug === slug)?.weapons;
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