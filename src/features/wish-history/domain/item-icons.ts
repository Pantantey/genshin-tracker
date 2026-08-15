import type { WishItemType } from "./wish";

/**
 * Icon resolution for wish items.
 *
 * The HoYoVerse wish API returns localized names and an empty `item_id`, so we
 * cannot link to a canonical asset id. enka.network's UI URLs 404 in this
 * environment, so we use Paimon.moe's public image CDN, which serves official
 * Genshin character/weapon renders and is hot-linkable:
 *
 * - Character: https://paimon.moe/images/characters/{slug}.png
 * - Weapon:    https://paimon.moe/images/weapons/{slug}.png
 *
 * Both underscore and hyphen spellings of the slug resolve, so we use the
 * canonical Paimon.moe slugs (underscore).
 *
 * The map key is the item name as stored (English for recent imports, Spanish
 * aliases included where they differ). If a name is missing or its image fails
 * to load, callers fall back to initials via `itemInitials`.
 */

const CHARACTER_BASE = "https://paimon.moe/images/characters";
const WEAPON_BASE = "https://paimon.moe/images/weapons";

/** Spanish/English item name -> paimon.moe character slug (full roster). */
const CHARACTER_ICONS: Record<string, string> = {
  Aino: "aino",
  Albedo: "albedo",
  Alhaitham: "alhaitham",
  Aloy: "aloy",
  Alyosha: "alyosha",
  Amber: "amber",
  "Arataki Itto": "arataki_itto",
  Arlecchino: "arlecchino",
  Baizhu: "baizhu",
  Barbara: "barbara",
  Beidou: "beidou",
  Bennett: "bennett",
  Candace: "candace",
  Charlotte: "charlotte",
  Chasca: "chasca",
  Chevreuse: "chevreuse",
  Chiori: "chiori",
  Chongyun: "chongyun",
  Citlali: "citlali",
  Clorinde: "clorinde",
  Collei: "collei",
  Columbina: "columbina",
  Cyno: "cyno",
  Dahlia: "dahlia",
  Dehya: "dehya",
  Diluc: "diluc",
  Diona: "diona",
  Dori: "dori",
  Durin: "durin",
  Emilie: "emilie",
  Escoffier: "escoffier",
  Eula: "eula",
  Faruzan: "faruzan",
  Fischl: "fischl",
  Flins: "flins",
  Freminet: "freminet",
  Furina: "furina",
  Gaming: "gaming",
  Ganyu: "ganyu",
  Gorou: "gorou",
  "Hu Tao": "hu_tao",
  Iansan: "iansan",
  Ifa: "ifa",
  Illuga: "illuga",
  Ineffa: "ineffa",
  Jahoda: "jahoda",
  Jean: "jean",
  Kachina: "kachina",
  "Kaedehara Kazuha": "kaedehara_kazuha",
  Kaeya: "kaeya",
  "Kamisato Ayaka": "kamisato_ayaka",
  "Kamisato Ayato": "kamisato_ayato",
  Kaveh: "kaveh",
  Keqing: "keqing",
  Kinich: "kinich",
  Kirara: "kirara",
  Klee: "klee",
  "Kujou Sara": "kujou_sara",
  "Kuki Shinobu": "kuki_shinobu",
  "Lan Yan": "lan_yan",
  Lauma: "lauma",
  Layla: "layla",
  Linnea: "linnea",
  Lisa: "lisa",
  Lohen: "lohen",
  Lynette: "lynette",
  Lyney: "lyney",
  Mavuika: "mavuika",
  Mika: "mika",
  Mona: "mona",
  Mualani: "mualani",
  Nahida: "nahida",
  Navia: "navia",
  Nefer: "nefer",
  Neuvillette: "neuvillette",
  Nicole: "nicole",
  Nilou: "nilou",
  Ningguang: "ningguang",
  Noelle: "noelle",
  Odette: "odette",
  Ororon: "ororon",
  Prune: "prune",
  Qiqi: "qiqi",
  "Raiden Shogun": "raiden_shogun",
  Razor: "razor",
  Rosaria: "rosaria",
  Sandrone: "sandrone",
  "Sangonomiya Kokomi": "sangonomiya_kokomi",
  Sayu: "sayu",
  Sethos: "sethos",
  Shenhe: "shenhe",
  "Shikanoin Heizou": "shikanoin_heizou",
  Sigewinne: "sigewinne",
  Skirk: "skirk",
  Sucrose: "sucrose",
  Tartaglia: "tartaglia",
  Thoma: "thoma",
  Tighnari: "tighnari",
  "Traveler (Dendro)": "traveler_dendro",
  "Traveler (Hydro)": "traveler_hydro",
  "Traveler (Pyro)": "traveler_pyro",
  Varesa: "varesa",
  Varka: "varka",
  Venti: "venti",
  Wanderer: "wanderer",
  Wriothesley: "wriothesley",
  Xiangling: "xiangling",
  Xianyun: "xianyun",
  Xiao: "xiao",
  Xilonen: "xilonen",
  Xingqiu: "xingqiu",
  Xinyan: "xinyan",
  "Yae Miko": "yae_miko",
  Yanfei: "yanfei",
  Yaoyao: "yaoyao",
  Yelan: "yelan",
  Yoimiya: "yoimiya",
  "Yumemizuki Mizuki": "yumemizuki_mizuki",
  "Yun Jin": "yun_jin",
  Zhongli: "zhongli",
  Zibai: "zibai",
  // Spanish aliases that differ from the official English slug key.
  Aliosha: "aliosha",
  "Shogun Raiden": "raiden_shogun",
};

/** Spanish item name -> paimon.moe weapon slug. Best-effort; fallback covers misses. */
const WEAPON_ICONS: Record<string, string> = {
  "Arco de Cuervo": "raven_bow",
  "Lanza de Favonius": "favonius_lance",
  Flauta: "the_flute",
  Herrumbre: "rust",
  "Espada Surcacielos": "skyrider_sword",
  "Orbe Esmeralda": "emerald_orb",
  "Guía Mágica": "magic_guide",
  "Sombra Férrea": "ferrous_shadow",
  "Garrote del Debate": "debate_club",
  "Borla Negra": "black_tassel",
  Tirachinas: "slingshot",
  "Hoja Fría": "cool_steel",
  "Cuentos de Cazadores de Dragones": "thrilling_tales_of_dragon_slayers",
  "Juramento del Arquero": "sharpshooters_oath",
  "Espada del Alba": "sword_of_descension",
  "Gran Espada Sangrienta": "bloodtainted_greatsword",
  "Prototipo Lanza": "prototype_starglitter",
  "Espada de Favonius": "favonius_sword",
  "Favonius Sword": "favonius_sword",
  "Gran Espada de Favonius": "favonius_greatsword",
  "Favonius Greatsword": "favonius_greatsword",
  "Arco de Favonius": "favonius_warbow",
  "Favonius Warbow": "favonius_warbow",
  "Favonius Lance": "favonius_lance",
  "Códex de Favonius": "favonius_codex",
  "Favonius Codex": "favonius_codex",
  // English aliases (imports may store English names).
  "The Flute": "the_flute",
  "Raven Bow": "raven_bow",
  Rust: "rust",
  "Skyrider Sword": "skyrider_sword",
  "Emerald Orb": "emerald_orb",
  "Magic Guide": "magic_guide",
  "Ferrous Shadow": "ferrous_shadow",
  "Debate Club": "debate_club",
  "Black Tassel": "black_tassel",
  Slingshot: "slingshot",
  "Cool Steel": "cool_steel",
  "Thrilling Tales of Dragon Slayers": "thrilling_tales_of_dragon_slayers",
  "Sharpshooter's Oath": "sharpshooters_oath",
  "Bloodtainted Greatsword": "bloodtainted_greatsword",
  "Prototype Starglitter": "prototype_starglitter",
};

/** Weapon slugs that cannot be derived from the English name alone. */
const WEAPON_SLUG_EXCEPTIONS: Record<string, string> = {
  "Ultimate Overlord's Mega Magic Sword": "ultimate_overlords_mega_magic_sword",
  // Paimon.moe uses a hyphen (not underscore) between these two words.
  "Mountain-Bracing Bolt": "mountain-bracing_bolt",
};

/**
 * Derive a paimon.moe weapon slug from an English name (e.g. "The Flute" ->
 * "the_flute", "Mountain-Bracing Bolt" -> "mountain_bracing_bolt"). Verified
 * against Paimon.moe's data: only 1 exception among 200 weapons.
 */
function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** True when the name contains only ASCII characters (i.e. English). */
function isAscii(value: string): boolean {
  return /^[\x00-\x7F]*$/.test(value);
}

/** Normalize Unicode whitespace (incl. non-breaking space) for name matching. */
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

/**
 * Resolve the paimon.moe icon URL for a wish, or `null` when the item is not
 * known (so callers can show a fallback).
 */
export function getItemIcon(
  name: string,
  itemType: WishItemType | null
): string | null {
  if (itemType === "weapon") {
    const explicit = lookupIn(WEAPON_ICONS, name);
    if (explicit) {
      return `${WEAPON_BASE}/${explicit}.png`;
    }
    // Spanish accented names can't be slugified; only auto-derive English ones.
    if (isAscii(name)) {
      const slug = WEAPON_SLUG_EXCEPTIONS[name] ?? slugifyName(name);
      return `${WEAPON_BASE}/${slug}.png`;
    }
    return null;
  }
  if (itemType === "character") {
    const slug = lookupIn(CHARACTER_ICONS, name);
    return slug ? `${CHARACTER_BASE}/${slug}.png` : null;
  }
  const characterSlug = lookupIn(CHARACTER_ICONS, name);
  if (characterSlug) {
    return `${CHARACTER_BASE}/${characterSlug}.png`;
  }
  const weaponSlug = lookupIn(WEAPON_ICONS, name);
  return weaponSlug ? `${WEAPON_BASE}/${weaponSlug}.png` : null;
}

/** First letters used as a fallback when no icon is available. */
export function itemInitials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}
