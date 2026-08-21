import { getItemIcon } from "../../wish-history/domain/item-icons";
import type { Element, WeaponType } from "../data/characters-data";

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

/** Element icon URL (e.g. "/icons/elements/Element_Pyro.png"). */
export function getElementIcon(element: Element): string {
  return `/icons/elements/Element_${ELEMENT_ICONS[element]}.png`;
}

/** Weapon type icon URL (e.g. "/icons/weapon-types/Icon_Sword.png"). */
export function getWeaponTypeIcon(weaponType: WeaponType): string {
  return `/icons/weapon-types/Icon_${WEAPON_TYPE_ICONS[weaponType]}.png`;
}