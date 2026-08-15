/**
 * Banner types currently supported by the application.
 *
 * Keep the set minimal (the four Genshin default banner categories) but
 * modeled as a closed union so the rest of the domain can be extended later
 * without rewriting computations.
 */
export type BannerType = "character" | "weapon" | "standard" | "novice";

/** HoYoVerse `gacha_type` value used when building a request for a banner. */
export const BANNER_GACHA_TYPES: Record<BannerType, string> = {
  character: "301",
  weapon: "302",
  standard: "200",
  novice: "100",
};

const GACHA_TYPE_TO_BANNER: Record<string, BannerType> = {
  "301": "character",
  "302": "weapon",
  "200": "standard",
  "100": "novice",
};

/**
 * Resolve a raw `gacha_type` string into a known {@link BannerType}.
 *
 * Returns `null` for unknown identifiers so the importer can count them as
 * invalid instead of guessing.
 */
export function parseBannerType(gachaType: string): BannerType | null {
  return GACHA_TYPE_TO_BANNER[gachaType] ?? null;
}

/** Human-readable labels used only for presentation. */
export const BANNER_LABELS: Record<BannerType, string> = {
  character: "Character Event Wish",
  weapon: "Weapon Event Wish",
  standard: "Standard Wish",
  novice: "Beginner Wish",
};

/** Display order used in filters and tabs. */
export const BANNER_ORDER: BannerType[] = [
  "character",
  "weapon",
  "standard",
  "novice",
];
