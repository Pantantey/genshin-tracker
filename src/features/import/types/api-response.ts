/**
 * External types for the HoYoVerse wish-history endpoint
 * (`gacha_info/api/getGachaLog`).
 *
 * These mirror the real response observed on `public-operation-hk4e-sg.hoyoverse.com`.
 * Note that every "numeric" field is returned as a string and `page` is
 * 0-based. They must never leak into UI/domain code directly; normalize them
 * through the importer.
 */
export interface GachaLogResponse {
  retcode: number;
  message: string;
  data: GachaLogData;
}

export interface GachaLogData {
  /** 0-based page number, as a string. */
  page: string;
  /** Requested page size, as a string. */
  size: string;
  /** Total count. Unreliable (observed as "0" even when a page has 20 items). */
  total: string;
  list: GachaLogItem[];
  region: string;
}

export interface GachaLogItem {
  uid: string;
  /** @example "301" */
  gacha_type: string;
  item_id: string;
  count: string;
  /** @example "2026-08-11 22:56:14" */
  time: string;
  name: string;
  lang: string;
  /** Localized item type, e.g. "Arma" / "Personaje" (lang=es). */
  item_type: string;
  /** Rarity as string: "3" | "4" | "5". */
  rank_type: string;
  /** Stable unique id of the pull. */
  id: string;
  op_gacha_type?: string;
}
