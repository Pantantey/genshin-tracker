/**
 * Build the HoYoVerse `getGachaLog` request URL from the wish-history URL the
 * user obtains with the external helper script.
 *
 * The pasted URL may be either an API URL or the webview URL with parameters
 * in its hash fragment. We pick out the auth material and reconstruct the
 * canonical operation URL, mirroring Paimon.moe's importer:
 *
 * - `end_id` (optional cursor) is the LAST wish id of the previous page. It is
 *   what actually makes the endpoint return older pulls — `page` alone is
 *   ignored by the server.
 * - `auth_appid`, `init_type` and `device_type` are required/standard params.
 * - `lang` is sent twice (`en` and `en-us`), as Paimon.moe does.
 */

const GLOBAL_HOST = "public-operation-hk4e-sg.hoyoverse.com";

export const GACHA_LOG_PATH = "gacha_info/api/getGachaLog";

export class GachaUrlError extends Error {}

interface GachaUrlParts {
  host: string;
  params: URLSearchParams;
  sourceUrl: string;
}

/**
 * Determine the operation host and base params from a pasted source URL.
 */
export function parseGachaUrlParts(sourceUrl: string): GachaUrlParts {
  let parsed: URL;
  try {
    parsed = new URL(sourceUrl.trim());
  } catch {
    throw new GachaUrlError("The URL does not look like a valid link.");
  }

  if (parsed.protocol !== "https:") {
    throw new GachaUrlError("The wish-history link must be an https URL.");
  }

  const params = new URLSearchParams(parsed.search);

  // webview URLs keep their real parameters inside the hash: #/log?...
  const hashQuestion = parsed.hash.indexOf("?");
  if (hashQuestion >= 0) {
    const hashParams = new URLSearchParams(parsed.hash.slice(hashQuestion + 1));
    hashParams.forEach((value, key) => params.set(key, value));
  }

  if (!params.get("authkey")) {
    throw new GachaUrlError(
      "The link is missing its auth key. It may be expired; try generating a new one."
    );
  }

  // Only the Global server is supported: the operation host is fixed.
  const host = GLOBAL_HOST;

  return { host, params, sourceUrl };
}

/**
 * Build the full request URL for one page of a banner.
 *
 * @param sourceUrl the pasted wish-history URL
 * @param gachaType e.g. "301"
 * @param page page number (0-based; the server echoes it but pagination is
 *   actually driven by `endId`)
 * @param size page size (max 20)
 * @param endId last wish id of the previous page; omit for the first page.
 *   This cursor is what advances through the history.
 */
export function buildGachaLogUrl(
  sourceUrl: string,
  gachaType: string,
  page: number,
  size = 20,
  endId?: string
): string {
  const { host, params } = parseGachaUrlParts(sourceUrl);

  params.set("auth_appid", "webview_gacha");
  params.set("init_type", "301");
  params.set("device_type", "pc");
  params.set("lang", "en");
  params.append("lang", "en-us");
  params.set("gacha_type", gachaType);
  params.set("page", String(page));
  params.set("size", String(size));

  if (endId) {
    params.set("end_id", endId);
  } else {
    params.delete("end_id");
  }

  return `https://${host}/${GACHA_LOG_PATH}?${params.toString()}`;
}

