import { getItemIcon } from "../../wish-history/domain/item-icons";
import { getWeaponData } from "../data/weapons-data";
import type { Element, WeaponType } from "../data/characters-data";
import type { Theme } from "@/hooks/use-theme";

/**
 * Icon resolution for the builds feature.
 *
 * - Weapon icon is derived automatically from the weapon's English name via the
 *   wish-history `getItemIcon`, so editing a weapon name in the data file also
 *   swaps its icon (looks in `public/icons/weapons/{slug}.png`).
 * - Element and weapon-type icons point at `public/icons/elements` and
 *   `public/icons/weapon-types`.
 */

/** Element -> asset slug ("pyro" -> "Pyro"). */
const ELEMENT_ICONS: Record<Element, string> = {
  anemo: "Anemo",
  cryo: "Cryo",
  dendro: "Dendro",
  electro: "Electro",
  geo: "Geo",
  hydro: "Hydro",
  pyro: "Pyro",
};

/** Weapon type -> asset slug ("sword" -> "Sword"). */
const WEAPON_TYPE_ICONS: Record<WeaponType, string> = {
  bow: "Bow",
  catalyst: "Catalyst",
  claymore: "Claymore",
  polearm: "Polearm",
  sword: "Sword",
};

/** Icon URL for a weapon by its name, or null when it cannot be resolved. */
export function getWeaponIcon(name: string): string | null {
  return getItemIcon(name, "weapon");
}

/**
 * i18n key for a weapon's display name, or undefined when the weapon is not in
 * the registry (e.g. characters or unknown items). Used to localize weapon
 * names in the wish history and banner.
 */
export function getWeaponNameKey(name: string): string | undefined {
  return getWeaponData(name)?.nameKey;
}

/** Element icon URL (e.g. "/icons/elements/Element_Pyro.png"). */
export function getElementIcon(element: Element): string {
  return `/icons/elements/Element_${ELEMENT_ICONS[element]}.png`;
}

/** Weapon type icon URL (e.g. "/icons/weapon-types/Icon_Sword.png"). */
export function getWeaponTypeIcon(weaponType: WeaponType): string {
  return `/icons/weapon-types/Icon_${WEAPON_TYPE_ICONS[weaponType]}.png`;
}

/** Artifact set icon URL from the file name in `public/icons/artifacts`. */
export function getArtifactIcon(file: string): string {
  return file ? `/icons/artifacts/${file}` : "";
}

/**
 * Derive a short display name for an artifact set from its image file name,
 * e.g. "scholar.webp" -> "scholar", "archaic_petra.webp" -> "archaic petra".
 * Underscores are replaced with spaces so the name reads naturally.
 */
export function getArtifactName(file: string): string {
  const base = file.split(".")[0] ?? file;
  return base.replaceAll("_", " ");
}

/** Artifact "piece" whose icon is theme-dependent (Sands / Goblet / Circlet). */
export type StatPiece = "sand" | "caliz" | "crown";

/** Icon URL for a themed artifact piece, e.g. "/icons/artifacts/sand-light.png". */
export function getStatPieceIcon(piece: StatPiece, theme: Theme): string {
  const variant = theme === "light" ? "light" : "dark";
  return `/icons/artifacts/${piece}-${variant}.png`;
}

/** Talent slot type: the elemental skill or the burst (ultimate). */
export type TalentKind = "elemental" | "burst";

/**
 * Talent icon URL for a character, e.g. "/icons/talents/odette-elemental.png".
 * The file may not exist; callers fall back to a placeholder on error.
 */
export function getTalentIcon(slug: string, kind: TalentKind): string {
  return `/icons/talents/${slug}-${kind}.png`;
}