import type { BannerType } from "./banner";
import type { Wish, WishRarity } from "./wish";
import { sortOldestFirst } from "./order";

/**
 * Pity is derived state: it is never persisted as a source of truth, it is
 * recomputed from the chronological wish history.
 */

/** Result for a single (rarity-specific) pity counter. */
export interface RarityPityResult {
  /**
   * Pity at which each wish occurred (1-based), keyed by wish id. A wish of
   * the tracked `rarity` reports the pity it landed on and then resets the
   * counter.
   */
  perWish: Record<string, number>;
  /** Number of wishes since the last tracked-`rarity` wish (0 if the last is one). */
  currentPity: number;
}

/**
 * Calculate pity for a single banner category and rarity.
 *
 * Counters are independent per rarity: every wish advances the counter, and it
 * resets to 0 ONLY when a wish of the tracked `rarity` appears. In Genshin a
 * 4-star advances (but does not reset) the 5-star counter, and vice versa;
 * this function implements exactly that.
 *
 * Wishes from other banner categories never affect this counter.
 */
export function calculateRarityPity(
  wishes: Wish[],
  bannerType: BannerType,
  rarity: WishRarity
): RarityPityResult {
  const ordered = sortOldestFirst(
    wishes.filter((w) => w.bannerType === bannerType)
  );

  let count = 0;
  const perWish: Record<string, number> = {};

  for (const wish of ordered) {
    count += wish.count;
    perWish[wish.id] = count;
    if (wish.rarity === rarity) {
      count = 0;
    }
  }

  return { perWish, currentPity: count };
}

/** Convenience 5-star pity result, also exposing the most recent 5-star id. */
export interface PityResult extends RarityPityResult {
  /** Id of the most recent 5-star for this banner, or null. */
  lastFiveStarId: string | null;
}

/** Calculate the 5-star pity for a banner. */
export function calculatePity(
  wishes: Wish[],
  bannerType: BannerType
): PityResult {
  const ordered = sortOldestFirst(
    wishes.filter((w) => w.bannerType === bannerType)
  );

  let count = 0;
  let lastFiveStarId: string | null = null;
  const perWish: Record<string, number> = {};

  for (const wish of ordered) {
    count += wish.count;
    perWish[wish.id] = count;
    if (wish.rarity === 5) {
      lastFiveStarId = wish.id;
      count = 0;
    }
  }

  return { perWish, currentPity: count, lastFiveStarId };
}

