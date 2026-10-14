/**
 * Asset names (slugs) of the characters/weapons currently shown for each banner.
 *
 * Change one of these values and every banner visual (tab icon and summary
 * image in `banner-assets.ts`) updates automatically. The name must match an
 * existing file in `public/icons/*` / `public/full/*` without the `.png`
 * extension.
 */

/** Character Event Wish — slug of the currently featured 5★ character. */
export const CHARACTER_BANNER_NAME = "skirk";

export const CHARACTER_FEATURED_ITEMS: string[] = [
  "mika",
  "candace",
  "dahlia",
];

/** Weapon Event Wish — main weapon. */
export const WEAPON_BANNER_NAME = "azurelight";

/** Weapon Event Wish — second featured weapon. */
export const WEAPON_BANNER_NAME_2 = "symphonist_of_scents";

/** Standard Wish — slug of the currently displayed standard 5★ character. */
export const STANDARD_BANNER_NAME = "mona";

/**
 * Weapon Event Wish featured overlay icons — currently disabled: keep the array
 * empty to show no overlay on the Weapon banner. To enable it, add slugs that
 * exist under `public/icons/weapons/` without the `.png` extension.
 */
export const WEAPON_FEATURED_ITEMS: string[] = [];

/** Standard Banner shows no event-specific featured icons. */
export const STANDARD_FEATURED_ITEMS: string[] = [];