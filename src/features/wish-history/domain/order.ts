import type { Wish } from "./wish";

/**
 * Chronological helpers.
 *
 * The canonical history must preserve chronological relationships for pity and
 * outcome calculations. UI sort order must not mutate persisted data, so these
 * helpers always return new arrays.
 */

/** Newest first (default display order). */
export function sortNewestFirst(wishes: Wish[]): Wish[] {
  return [...wishes].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

/** Oldest first (calculation and oldest-first display order). */
export function sortOldestFirst(wishes: Wish[]): Wish[] {
  return [...wishes].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
