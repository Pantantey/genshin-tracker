import type { WishItemType } from "./wish";

const CHARACTER_BASE = "/icons/characters";
const WEAPON_BASE = "/icons/weapons";

/** Character slugs that cannot be derived from the English name (none today). */
const CHARACTER_SLUG_EXCEPTIONS: Record<string, string> = {};

/** Weapon slugs that cannot be derived from the English name. */
const WEAPON_SLUG_EXCEPTIONS: Record<string, string> = {
  "Ultimate Overlord's Mega Magic Sword": "ultimate_overlords_mega_magic_sword",
  "Mountain-Bracing Bolt": "mountain-bracing_bolt",
};

/** Legacy aliases for old imports stored with Spanish/accented names. */
const LEGACY_ALIASES: Record<string, string> = {
  // Characters
  Sacarosa: "sucrose",
  "Shogun Raiden": "raiden_shogun",
  // Weapons
  "Arco de Cuervo": "raven_bow",
  "Guía Mágica": "magic_guide",
  "Orbe Esmeralda": "emerald_orb",
  "Sombra Férrea": "ferrous_shadow",
  "Garrote del Debate": "debate_club",
  "Espada Surcacielos": "skyrider_sword",
  "Hoja Fría": "cool_steel",
  "Cuentos de Cazadores de Dragones": "thrilling_tales_of_dragon_slayers",
  "Juramento del Arquero": "sharpshooters_oath",
  "Gran Espada Sangrienta": "bloodtainted_greatsword",
  "Borla Negra": "black_tassel",
  Tirachinas: "slingshot",
  Flauta: "the_flute",
  "Lanza de Favonius": "favonius_lance",
  "Espada de Favonius": "favonius_sword",
  "Gran Espada de Favonius": "favonius_greatsword",
  "Arco de Favonius": "favonius_warbow",
  "Códex de Favonius": "favonius_codex",
  "Prototipo Lanza": "prototype_starglitter",
};

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** True when the name contains only ASCII characters (i.e. English). */
function isAscii(value: string): boolean {
  return /^[\x00-\x7F]*$/.test(value);
}

/** Normalize Unicode whitespace (incl. non-breaking space) for matching. */
function normalizeKey(value: string): string {
  return value
    .replace(/[\u00A0\u2009\u2003\u2002\u200B \t\r\n]+/g, " ")
    .trim()
    .toLowerCase();
}

function lookupIn(
  record: Record<string, string>,
  name: string
): string | undefined {
  const wanted = normalizeKey(name);
  for (const [key, value] of Object.entries(record)) {
    if (normalizeKey(key) === wanted) {
      return value;
    }
  }
  return undefined;
}


export function getItemIcon(
  name: string,
  itemType: WishItemType | null
): string | null {
  const base = itemType === "weapon" ? WEAPON_BASE : CHARACTER_BASE;
  const exceptions =
    itemType === "weapon" ? WEAPON_SLUG_EXCEPTIONS : CHARACTER_SLUG_EXCEPTIONS;

  let slug: string | undefined;
  if (isAscii(name)) {
    slug = exceptions[name] ?? slugifyName(name);
  } else {
    slug = lookupIn(LEGACY_ALIASES, name);
  }

  if (!slug) {
    return null;
  }
  return `${base}/${slug}.png`;
}

/** First letters used as a fallback when no icon is available. */
export function itemInitials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}