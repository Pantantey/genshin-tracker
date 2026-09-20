import type { Wish } from "./wish";
import type { FiveStarStatus } from "./outcome";
import { slugifyName } from "./item-icons";

/**
 * Slugs of the Genshin Impact permanent (Standard Wish) 5-star characters.
 *
 * The Character Event Wish 50/50 can only drop these characters when lost.
 * A 5-star character that is NOT in this pool is the featured/rate-up item.
 *
 * Review this list whenever a new character is added to the Standard Wish
 * (e.g. Tighnari in 3.0, Dehya in 3.5, Yumemizuki Mizuki in 5.5).
 */
export const STANDARD_POOL_SLUGS: ReadonlySet<string> = new Set([
  "jean",
  "diluc",
  "qiqi",
  "mona",
  "keqing",
  "tighnari",
  "dehya",
  "yumemizuki_mizuki",
]);

/**
 * Simplified featured-status provider for the Character Event Wish.
 *
 * Returns `"standard"` when the 5-star character belongs to the permanent
 * pool (50/50 lost → next 5-star is guaranteed), `"featured"` when it does
 * not (rate-up item → next 5-star is a fresh 50/50), and `"unknown"` for
 * non-character wishes or non-character banners.
 *
 * The name is compared via {@link slugifyName}, which also matches the
 * Spanish names of the pool characters (they are proper nouns without
 * accents, e.g. "Mona" → "mona").
 *
 * Note: this uses the current pool as reference. Historical wishes pulled
 * while a now-standard character was still a limited rate-up (e.g. Tighnari
 * during 3.0) are classified as `"standard"` even though they were featured.
 * A date-based banner catalog would be needed to fix that edge case.
 */
export function isStandardPoolCharacter(wish: Wish): FiveStarStatus {
  if (wish.bannerType !== "character") {
    return "unknown";
  }
  if (wish.itemType !== "character") {
    return "unknown";
  }
  return STANDARD_POOL_SLUGS.has(slugifyName(wish.name))
    ? "standard"
    : "featured";
}