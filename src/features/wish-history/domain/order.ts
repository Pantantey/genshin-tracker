import type { Wish } from "./wish";

/**
 * Chronological helpers.
 *
 * The canonical history must preserve chronological relationships for pity and
 * outcome calculations. UI sort order must not mutate persisted data, so these
 * helpers always return new arrays.
 *
 * Wishes pulled together share the same timestamp and the source lists them
 * newest-first, so within an equal timestamp the `id` (which increases with
 * time) decides the true order: smallest id = oldest pull.
 */

/** Ascending numeric order for string ids (length first, then lexicographic). */
function idCompareAsc(a: string, b: string): number {
  return a.length - b.length || (a < b ? -1 : a > b ? 1 : 0);
}

/** Newest first (default display order). */
export function sortNewestFirst(wishes: Wish[]): Wish[] {
  return [...wishes].sort(
    (a, b) =>
      b.timestamp.localeCompare(a.timestamp) || idCompareAsc(a.id, b.id)
  );
}

/** Oldest first (calculation and oldest-first display order). */
export function sortOldestFirst(wishes: Wish[]): Wish[] {
  return [...wishes].sort(
    (a, b) =>
      a.timestamp.localeCompare(b.timestamp) || idCompareAsc(a.id, b.id)
  );
}
