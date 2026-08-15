import type { BannerType } from "./banner";

/** Supported Genshin wish rarities, typed instead of arbitrary strings. */
export type WishRarity = 3 | 4 | 5;

/** Canonical item type. Mapped from the (localized) API `item_type` field. */
export type WishItemType = "character" | "weapon";

/** Where a canonical wish originated. Allows new sources later. */
export type WishSource = "hoyoverse";

/**
 * Canonical, normalized wish used throughout the application.
 *
 * Imported external data is converted into this representation before being
 * consumed by the rest of the app. The `timestamp` is stored as an ISO-like
 * `"YYYY-MM-DDTHH:mm:ss"` string (offset-less) which is stable, sorts
 * lexicographically in chronological order, and is safe to persist.
 */
export interface Wish {
  /** Stable unique identifier originating from the external source. */
  id: string;
  /** Account / game identifier that owns the wish. */
  uid: string;
  bannerType: BannerType;
  /** External item identifier, when available. */
  itemId: string | null;
  /** Localized item name as provided by the source. */
  name: string;
  /** Normalized item type, or null when it could not be determined. */
  itemType: WishItemType | null;
  rarity: WishRarity;
  /** Number of pulls this record represents. */
  count: number;
  timestamp: string;
  source: WishSource;
}
