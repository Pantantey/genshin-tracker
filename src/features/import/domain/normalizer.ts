import type { GachaLogItem } from "../types/api-response";
import { parseBannerType } from "../../wish-history/domain/banner";
import type { Wish, WishItemType, WishRarity } from "../../wish-history/domain/wish";

/**
 * Normalization of raw external items into the canonical {@link Wish} model.
 *
 * The API represents numbers as strings, item type is localized, and some
 * fields may be empty. This layer resolves all of those differences. Unknown
 * banner types or rarities yield `null` so the importer can report them as
 * invalid instead of guessing.
 */

const CHARACTER_TYPE_NAMES = new Set([
  "character",
  "characters",
  "personaje",
  "角色",
]);
const WEAPON_TYPE_NAMES = new Set([
  "weapon",
  "weapons",
  "arma",
  "武器",
]);

export function normalizeWish(raw: GachaLogItem): Wish | null {
  const bannerType = parseBannerType(raw.gacha_type);
  const rarity = parseRarity(raw.rank_type);
  if (!bannerType || !rarity) {
    return null;
  }

  return {
    id: raw.id,
    uid: raw.uid,
    bannerType,
    itemId: raw.item_id || null,
    name: raw.name,
    itemType: normalizeItemType(raw.item_type),
    rarity,
    count: parseIntSafe(raw.count, 1),
    timestamp: normalizeTimestamp(raw.time),
    source: "hoyoverse",
  };
}

function parseRarity(value: string): WishRarity | null {
  const n = parseIntSafe(value);
  if (n === 3 || n === 4 || n === 5) {
    return n;
  }
  return null;
}

/**
 * Map the localized `item_type` to a canonical enum. Falls back to `null`
 * when the value is unrecognized rather than guessing.
 */
function normalizeItemType(value: string): WishItemType | null {
  const normalized = value.trim().toLowerCase();
  if (CHARACTER_TYPE_NAMES.has(normalized)) {
    return "character";
  }
  if (WEAPON_TYPE_NAMES.has(normalized)) {
    return "weapon";
  }
  return null;
}

/**
 * Reformat `"YYYY-MM-DD HH:MM:SS"` into the canonical `"YYYY-MM-DDTHH:mm:ss"`
 * (offset-less). This is stable, persists cleanly, and sorts in chronological
 * order, without silently shifting the historical timestamp across timezones.
 */
function normalizeTimestamp(value: string): string {
  return value.includes("T") ? value : value.replace(" ", "T");
}

function parseIntSafe(value: string, fallback = 0): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}
