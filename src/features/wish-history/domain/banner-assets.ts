import type { BannerType } from "./banner";
import {
  CHARACTER_BANNER_NAME,
  STANDARD_BANNER_NAME,
  WEAPON_BANNER_NAME,
  WEAPON_BANNER_NAME_2,
  CHARACTER_FEATURED_ITEMS,
  STANDARD_FEATURED_ITEMS,
  WEAPON_FEATURED_ITEMS,
} from "./banner-names";

/**
 * Visual assets for each wish banner.
 *
 * The asset names live in `banner-names.ts`; editing a single constant there
 * updates both the tab icon and the summary image everywhere in the app.
 */

export interface BannerAssets {
  /** Small thumbnail shown in the banner tabs. */
  icon: string;
  /** Main image shown in the summary box. */
  image: string;
  /**
   * Optional second image (Weapon banner only). When present, the summary
   * renders TWO half-size images side by side instead of one large one:
   * `image` on the left and `image2` on the right.
   */
  image2?: string;
}

/** Character Event Wish — currently featured 5★ character. */
export const CHARACTER_EVENT_WISH_ASSETS: BannerAssets = {
  icon: `/icons/characters/${CHARACTER_BANNER_NAME}.png`,
  image: `/full/characters/${CHARACTER_BANNER_NAME}.png`,
};

/** Weapon Event Wish — currently featured weapon (its icon doubles as the image). */
export const WEAPON_EVENT_WISH_ASSETS: BannerAssets = {
  icon: `/icons/weapons/${WEAPON_BANNER_NAME}.png`,
  image: `/icons/weapons/${WEAPON_BANNER_NAME}.png`,
  image2: `/icons/weapons/${WEAPON_BANNER_NAME_2}.png`,
};

/** Standard Wish — currently displayed standard 5★ character. */
export const STANDARD_BANNER_ASSETS: BannerAssets = {
  icon: `/icons/characters/${STANDARD_BANNER_NAME}.png`,
  image: `/full/characters/${STANDARD_BANNER_NAME}.png`,
};

/** Asset lookup by banner type, used by the UI. */
export const BANNER_ASSETS: Record<BannerType, BannerAssets> = {
  character: CHARACTER_EVENT_WISH_ASSETS,
  weapon: WEAPON_EVENT_WISH_ASSETS,
  standard: STANDARD_BANNER_ASSETS,
};

/**
 * Featured item slugs shown as small overlay icons on each banner image.
 * The values mirror the single-source constants in `banner-names.ts`.
 */
export const BANNER_FEATURED_ITEMS: Record<BannerType, string[]> = {
  character: CHARACTER_FEATURED_ITEMS,
  weapon: WEAPON_FEATURED_ITEMS,
  standard: STANDARD_FEATURED_ITEMS,
};

/**
 * Build the static icon URL for a featured item slug of a banner.
 * On the Character banner every featured item is a character and on the Weapon
 * banner every featured item is a weapon, so the folder follows the banner.
 */
export function getFeaturedItemUrl(banner: BannerType, slug: string): string {
  const type = banner === "weapon" ? "weapons" : "characters";
  return `/icons/${type}/${slug}.png`;
}