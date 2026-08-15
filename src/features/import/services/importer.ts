import type { Wish } from "../../wish-history/domain/wish";
import {
  BANNER_GACHA_TYPES,
  BANNER_ORDER,
  type BannerType,
} from "../../wish-history/domain/banner";
import type { GachaLogResponse } from "../types/api-response";
import { normalizeWish } from "../domain/normalizer";
import { buildGachaLogUrl, GachaUrlError } from "../domain/url";

/**
 * Importer: obtains external HoYoVerse data and converts it into canonical
 * wishes. It knows nothing about IndexedDB, and it returns a structured result
 * so the UI can give useful feedback.
 *
 * Banners are fetched concurrently, and each banner stops paging as soon as the
 * server returns a page with no new wishes (the endpoint can return the same
 * recent window regardless of the `page` value, so we must not hammer it).
 */

const PAGE_SIZE = 20;
/** Safety bound against a pathological infinite loop (not normally reached). */
const MAX_PAGES_PER_BANNER = 3000;
/** How many fetch attempts a page gets before giving up (rate-limit/5xx/network). */
const MAX_ATTEMPTS = 4;
/** Pause between page requests to respect HoYoVerse rate limiting. */
const PAGE_DELAY_MS = 500;
/** Pause between banner fetches to respect HoYoVerse rate limiting. */
const BANNER_DELAY_MS = 800;

export interface ImportProgress {
  banner: string;
  page: number;
  processed: number;
}

export type ProgressListener = (progress: ImportProgress) => void;

export interface ImportResult {
  /** Wishes that are genuinely new to the existing local history. */
  wishes: Wish[];
  addedCount: number;
  /** Wishes that already existed locally before this import. */
  alreadyCount: number;
  /** Duplicates found within a single banner's pagination. */
  duplicateCount: number;
  /** Records that could not be normalized. */
  invalidCount: number;
  /** Banner types requested but that returned no data at all. */
  skippedGachaTypes: string[];
  /** Errors collected while fetching (e.g. invalid/expired authkey). */
  errors: string[];
}

interface BannerResult {
  wishes: Wish[];
  addedCount: number;
  alreadyCount: number;
  duplicateCount: number;
  invalidCount: number;
  error: string | null;
  returnedData: boolean;
  requestPages: number;
}

/**
 * Import the wish history for all known banners.
 *
 * @param sourceUrl pasted wish-history URL
 * @param existingIds ids already present locally, to distinguish added/already
 * @param onProgress optional callback for UI progress
 */
export async function importWishHistory(
  sourceUrl: string,
  existingIds: ReadonlySet<string>,
  onProgress?: ProgressListener
): Promise<ImportResult> {
  const wishes: Wish[] = [];
  const errors: string[] = [];
  const skippedGachaTypes: string[] = [];
  let addedCount = 0;
  let alreadyCount = 0;
  let duplicateCount = 0;
  let invalidCount = 0;

  // Banners are fetched sequentially with a pause between them: the endpoint
  // rate-limits, so parallel bursts cause later pages to fail.
  for (const banner of BANNER_ORDER) {
    const result = await importBanner(
      sourceUrl,
      banner,
      BANNER_GACHA_TYPES[banner],
      existingIds,
      onProgress
    );

    wishes.push(...result.wishes);
    addedCount += result.addedCount;
    alreadyCount += result.alreadyCount;
    duplicateCount += result.duplicateCount;
    invalidCount += result.invalidCount;

    if (result.error) {
      errors.push(result.error);
    }
    if (!result.returnedData && !result.error) {
      skippedGachaTypes.push(BANNER_GACHA_TYPES[banner]);
    }

    await sleep(BANNER_DELAY_MS);
  }

  return {
    wishes,
    addedCount,
    alreadyCount,
    duplicateCount,
    invalidCount,
    skippedGachaTypes,
    errors,
  };
}

async function importBanner(
  sourceUrl: string,
  banner: BannerType,
  gachaType: string,
  existingIds: ReadonlySet<string>,
  onProgress?: ProgressListener
): Promise<BannerResult> {
  const seenThisRun = new Set<string>();
  const wishes: Wish[] = [];
  let addedCount = 0;
  let alreadyCount = 0;
  let duplicateCount = 0;
  let invalidCount = 0;
  let error: string | null = null;
  let requestPages = 0;

  let page = 0;
  let lastId: string | undefined;

  while (page < MAX_PAGES_PER_BANNER) {
    requestPages += 1;
    onProgress?.({
      banner,
      page,
      processed: wishes.length + alreadyCount + duplicateCount + invalidCount,
    });

    let response: GachaLogResponse;
    try {
      response = await fetchGachaLog(
        buildGachaLogUrl(sourceUrl, gachaType, page, PAGE_SIZE, lastId)
      );
    } catch (caught) {
      error = describeFetchError(banner, caught);
      break;
    }

    if (response.retcode !== 0) {
      error = `${banner}: API error — ${response.message || "unknown"}`;
      break;
    }

    const list = response.data?.list ?? [];
    if (list.length === 0) {
      break;
    }

    let newInPage = 0;
    for (const raw of list) {
      const wish = normalizeWish(raw);
      if (!wish) {
        invalidCount += 1;
        continue;
      }
      if (seenThisRun.has(wish.id)) {
        duplicateCount += 1;
        continue;
      }
      seenThisRun.add(wish.id);
      newInPage += 1;
      if (existingIds.has(wish.id)) {
        alreadyCount += 1;
        continue;
      }
      addedCount += 1;
      wishes.push(wish);
    }

    // Advance the pagination cursor to the oldest wish of this page.
    lastId = list[list.length - 1].id;

    // The server returned a page with no new wish ids: we are looping over the
    // same recent window. Stop this banner.
    if (newInPage === 0) {
      break;
    }
    // A page shorter than the requested size means it was the last real one.
    if (list.length < PAGE_SIZE) {
      break;
    }

    page += 1;
    await sleep(PAGE_DELAY_MS);
  }

  return {
    wishes,
    addedCount,
    alreadyCount,
    duplicateCount,
    invalidCount,
    error,
    returnedData: addedCount + alreadyCount + duplicateCount + invalidCount > 0,
    requestPages,
  };
}

/**
 * Fetch one page, retrying transient failures (network, HTTP 429, HTTP 5xx).
 * Non-zero HoYoVerse retcodes (e.g. expired authkey) are returned as-is so the
 * caller can report a clear warning instead of silently retrying forever.
 *
 * Requests go through the same-origin `/api/gacha` proxy to avoid CORS: the
 * HoYoVerse endpoint does not send `Access-Control-Allow-Origin`, which blocks
 * direct browser fetches when the app is served from a remote origin.
 */
async function fetchGachaLog(url: string): Promise<GachaLogResponse> {
  let lastError: unknown;
  const wait = (attempt: number) => sleep(PAGE_DELAY_MS * (attempt + 1));

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    let response: Response;
    try {
      response = await fetch(`/api/gacha?url=${encodeURIComponent(url)}`, {
        headers: { Accept: "application/json" },
      });
    } catch (caught) {
      lastError = caught;
      await wait(attempt);
      continue;
    }

    if (!response.ok) {
      if (response.status === 429 || response.status >= 500) {
        lastError = new Error(`HTTP ${response.status}`);
        await wait(attempt);
        continue;
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as GachaLogResponse;
  }

  throw lastError instanceof Error ? lastError : new Error("request failed");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function describeFetchError(banner: string, error: unknown): string {
  const detail =
    error instanceof GachaUrlError
      ? error.message
      : error instanceof Error
        ? error.message
        : "network failure";
  return `${banner}: Failed to fetch — ${detail}`;
}
