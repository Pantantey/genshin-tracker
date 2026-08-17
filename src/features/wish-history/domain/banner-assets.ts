import type { BannerType } from "./banner";
import {
  CHARACTER_BANNER_NAME,
  STANDARD_BANNER_NAME,
  WEAPON_BANNER_NAME,
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