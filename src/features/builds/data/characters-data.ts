/**
 * Builds feature — per-character build data.
 *
 * TEMPORARY data: every character is Pyro/Sword and every weapon slot is
 * "Absolution" (the first weapon in the catalog) until the real data is filled in.
 * The weapon icon resolves automatically from the weapon name via item-icons.
 * To add a new character, copy an existing block and edit slug/name/element/weaponType/weapons.
 */

export type Element =
  | "anemo"
  | "cryo"
  | "dendro"
  | "electro"
  | "geo"
  | "hydro"
  | "pyro";

export type WeaponType =
  | "bow"
  | "catalyst"
  | "claymore"
  | "polearm"
  | "sword";

export interface WeaponData {
  name: string;
  /** 3, 4 or 5 stars. */
  stars: 3 | 4 | 5;
  mainStat: string;
  secondaryStat: string;
  description: string;
}

export interface CharacterBuildData {
  slug: string;
  name: string;
  element: Element;
  weaponType: WeaponType;
  /** `true` shows the full build; `false` shows a "Coming soon" placeholder. */
  available: boolean;
  weapons: WeaponData[];
}

export const CHARACTERS_DATA: CharacterBuildData[] = [
  {
    slug: "aino",
    name: "Aino",
    element: "hydro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "albedo",
    name: "Albedo",
    element: "geo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "alhaitham",
    name: "Alhaitham",
    element: "dendro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "aloy",
    name: "Aloy",
    element: "cryo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "alyosha",
    name: "Alyosha",
    element: "electro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "amber",
    name: "Amber",
    element: "pyro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "arataki_itto",
    name: "Arataki Itto",
    element: "geo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "arlecchino",
    name: "Arlecchino",
    element: "pyro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "baizhu",
    name: "Baizhu",
    element: "dendro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "barbara",
    name: "Barbara",
    element: "hydro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "beidou",
    name: "Beidou",
    element: "electro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "bennett",
    name: "Bennett",
    element: "pyro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "candace",
    name: "Candace",
    element: "hydro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "charlotte",
    name: "Charlotte",
    element: "cryo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "chasca",
    name: "Chasca",
    element: "anemo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "chevreuse",
    name: "Chevreuse",
    element: "pyro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "chiori",
    name: "Chiori",
    element: "geo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "chongyun",
    name: "Chongyun",
    element: "cryo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "citlali",
    name: "Citlali",
    element: "cryo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "clorinde",
    name: "Clorinde",
    element: "electro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "collei",
    name: "Collei",
    element: "dendro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "columbina",
    name: "Columbina",
    element: "hydro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "cyno",
    name: "Cyno",
    element: "electro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "dahlia",
    name: "Dahlia",
    element: "hydro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "dehya",
    name: "Dehya",
    element: "pyro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "diluc",
    name: "Diluc",
    element: "pyro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "diona",
    name: "Diona",
    element: "cryo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "dori",
    name: "Dori",
    element: "electro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "durin",
    name: "Durin",
    element: "pyro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "emilie",
    name: "Emilie",
    element: "dendro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "escoffier",
    name: "Escoffier",
    element: "cryo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "eula",
    name: "Eula",
    element: "cryo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "faruzan",
    name: "Faruzan",
    element: "anemo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "fischl",
    name: "Fischl",
    element: "electro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "flins",
    name: "Flins",
    element: "electro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "freminet",
    name: "Freminet",
    element: "cryo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "furina",
    name: "Furina",
    element: "hydro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "gaming",
    name: "Gaming",
    element: "pyro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "ganyu",
    name: "Ganyu",
    element: "cryo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "gorou",
    name: "Gorou",
    element: "geo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "hu_tao",
    name: "Hu Tao",
    element: "pyro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "iansan",
    name: "Iansan",
    element: "electro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "ifa",
    name: "Ifa",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "illuga",
    name: "Illuga",
    element: "geo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "ineffa",
    name: "Ineffa",
    element: "electro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "jahoda",
    name: "Jahoda",
    element: "anemo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "jean",
    name: "Jean",
    element: "anemo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kachina",
    name: "Kachina",
    element: "geo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kaedehara_kazuha",
    name: "Kaedehara Kazuha",
    element: "anemo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kaeya",
    name: "Kaeya",
    element: "cryo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kamisato_ayaka",
    name: "Kamisato Ayaka",
    element: "cryo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kamisato_ayato",
    name: "Kamisato Ayato",
    element: "hydro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kaveh",
    name: "Kaveh",
    element: "dendro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "keqing",
    name: "Keqing",
    element: "electro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kinich",
    name: "Kinich",
    element: "dendro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kirara",
    name: "Kirara",
    element: "dendro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "klee",
    name: "Klee",
    element: "pyro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kujou_sara",
    name: "Kujou Sara",
    element: "electro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "kuki_shinobu",
    name: "Kuki Shinobu",
    element: "electro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "lan_yan",
    name: "Lan Yan",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "lauma",
    name: "Lauma",
    element: "dendro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "layla",
    name: "Layla",
    element: "cryo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "linnea",
    name: "Linnea",
    element: "geo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "lisa",
    name: "Lisa",
    element: "electro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "lohen",
    name: "Lohen",
    element: "cryo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "lynette",
    name: "Lynette",
    element: "anemo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "lyney",
    name: "Lyney",
    element: "pyro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "mavuika",
    name: "Mavuika",
    element: "pyro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "mika",
    name: "Mika",
    element: "cryo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "mona",
    name: "Mona",
    element: "hydro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "mualani",
    name: "Mualani",
    element: "hydro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "nahida",
    name: "Nahida",
    element: "dendro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "navia",
    name: "Navia",
    element: "geo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "nefer",
    name: "Nefer",
    element: "dendro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "neuvillette",
    name: "Neuvillette",
    element: "hydro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "nicole",
    name: "Nicole",
    element: "pyro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "nilou",
    name: "Nilou",
    element: "hydro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "ningguang",
    name: "Ningguang",
    element: "geo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "noelle",
    name: "Noelle",
    element: "geo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "odette",
    name: "Odette",
    element: "cryo",
    weaponType: "sword",
    available: true,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Nocturne's Curtain Call", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "ororon",
    name: "Ororon",
    element: "electro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "prune",
    name: "Prune",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "qiqi",
    name: "Qiqi",
    element: "cryo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "raiden_shogun",
    name: "Raiden Shogun",
    element: "electro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "razor",
    name: "Razor",
    element: "electro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "rosaria",
    name: "Rosaria",
    element: "cryo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "sandrone",
    name: "Sandrone",
    element: "cryo",
    weaponType: "claymore",
    available: true,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "sangonomiya_kokomi",
    name: "Sangonomiya Kokomi",
    element: "hydro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "sayu",
    name: "Sayu",
    element: "anemo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "sethos",
    name: "Sethos",
    element: "electro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "shenhe",
    name: "Shenhe",
    element: "cryo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "shikanoin_heizou",
    name: "Shikanoin Heizou",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "sigewinne",
    name: "Sigewinne",
    element: "hydro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "skirk",
    name: "Skirk",
    element: "cryo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "sucrose",
    name: "Sucrose",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "tartaglia",
    name: "Tartaglia",
    element: "hydro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "thoma",
    name: "Thoma",
    element: "pyro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "tighnari",
    name: "Tighnari",
    element: "dendro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "traveler_anemo",
    name: "Traveler Anemo",
    element: "anemo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "traveler_dendro",
    name: "Traveler Dendro",
    element: "dendro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "traveler_electro",
    name: "Traveler Electro",
    element: "electro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "traveler_geo",
    name: "Traveler Geo",
    element: "geo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "traveler_hydro",
    name: "Traveler Hydro",
    element: "hydro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "traveler_pyro",
    name: "Traveler Pyro",
    element: "pyro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "varesa",
    name: "Varesa",
    element: "electro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "varka",
    name: "Varka",
    element: "anemo",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "venti",
    name: "Venti",
    element: "anemo",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "wanderer",
    name: "Wanderer",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "wriothesley",
    name: "Wriothesley",
    element: "cryo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "xiangling",
    name: "Xiangling",
    element: "pyro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "xianyun",
    name: "Xianyun",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "xiao",
    name: "Xiao",
    element: "anemo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "xilonen",
    name: "Xilonen",
    element: "geo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "xingqiu",
    name: "Xingqiu",
    element: "hydro",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "xinyan",
    name: "Xinyan",
    element: "pyro",
    weaponType: "claymore",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "yae_miko",
    name: "Yae Miko",
    element: "electro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "yanfei",
    name: "Yanfei",
    element: "pyro",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "yaoyao",
    name: "Yaoyao",
    element: "dendro",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "yelan",
    name: "Yelan",
    element: "hydro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "yoimiya",
    name: "Yoimiya",
    element: "pyro",
    weaponType: "bow",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "yumemizuki_mizuki",
    name: "Yumemizuki Mizuki",
    element: "anemo",
    weaponType: "catalyst",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "yun_jin",
    name: "Yun Jin",
    element: "geo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "zhongli",
    name: "Zhongli",
    element: "geo",
    weaponType: "polearm",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
  {
    slug: "zibai",
    name: "Zibai",
    element: "geo",
    weaponType: "sword",
    available: false,
    weapons: [
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." },
    { name: "Absolution", stars: 5, mainStat: "Daño principal", secondaryStat: "Daño secundario", description: "Pequeña descripción del arma." }
    ],
  },
];
