import type { BannerType } from "./banner";
import type { Wish } from "./wish";
import { sortOldestFirst } from "./order";

/**
 * 50/50 and guarantee are derived state computed from the chronological
 * sequence of 5-star results for a banner.
 *
 * Determining whether a 5-star is featured requires external banner metadata
 * (which item was the rate-up at that date). The API does not provide that
 * directly, so the calculation accepts an injectable {@link FeaturedProvider}.
 */

/**
 * Whether a 5-star wish is the featured/rate-up item of its banner.
 *
 * - `"featured"`: rate-up item (50/50 won).
 * - `"standard"`: non-featured 5-star (50/50 lost, next is guaranteed).
 * - `"unknown"`: featured status could not be determined.
 */
export type FiveStarStatus = "featured" | "standard" | "unknown";

/** State in which the *next* 5-star is obtained. */
export type OutcomeState = "normal" | "guaranteed";

/** Interpretation of a historical 5-star pull. */
export type FiftyFiftyResult =
  | "won"
  | "lost"
  | "guaranteed"
  | "unknown";

export type FeaturedProvider = (wish: Wish) => FiveStarStatus;

export interface WishOutcome {
  fiftyFifty: FiftyFiftyResult;
  /** True when this 5-star was obtained via the guaranteed path. */
  guaranteed: boolean;
}

export interface OutcomeResult {
  /** Per-wish outcome keyed by wish id (only includes 5-star wishes). */
  perWish: Record<string, WishOutcome>;
  /** Guarantee state for the *next* 5-star of this banner. */
  currentState: OutcomeState;
  /** Id of the most recent 5-star, or null. */
  lastFiveStarId: string | null;
}

/**
 * Default provider: always returns `"unknown"`. Real featured detection
 * requires banner metadata and is wired in where banner data is available.
 */
export const UNKNOWN_FEATURED: FeaturedProvider = () => "unknown";

export function calculateOutcome(
  wishes: Wish[],
  bannerType: BannerType,
  isFeatured: FeaturedProvider = UNKNOWN_FEATURED
): OutcomeResult {
  const ordered = sortOldestFirst(
    wishes.filter((w) => w.bannerType === bannerType && w.rarity === 5)
  );

  let state: OutcomeState = "normal";
  let lastFiveStarId: string | null = null;
  const perWish: Record<string, WishOutcome> = {};

  for (const wish of ordered) {
    lastFiveStarId = wish.id;

    if (state === "guaranteed") {
      perWish[wish.id] = { fiftyFifty: "guaranteed", guaranteed: true };
      state = "normal";
      continue;
    }

    const status = isFeatured(wish);
    if (status === "featured") {
      perWish[wish.id] = { fiftyFifty: "won", guaranteed: false };
      state = "normal";
    } else if (status === "standard") {
      perWish[wish.id] = { fiftyFifty: "lost", guaranteed: false };
      state = "guaranteed";
    } else {
      perWish[wish.id] = { fiftyFifty: "unknown", guaranteed: false };
    }
  }

  return { perWish, currentState: state, lastFiveStarId };
}
