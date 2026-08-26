/**
 * Site-wide constants shared by SEO modules (metadata, sitemap, robots, OG).
 *
 * Keep the canonical domain here so every part of the app references the same
 * URL. `metadataBase` in the root layout resolves all relative URLs (canonical,
 * OG images) against this absolute origin.
 */
export const SITE_URL = "https://www.genshin-info.site";

export const SITE_NAME = "Genshin-Info.site";

/** Keyword-rich <title> used on the homepage and as the default page title. */
export const SITE_TITLE =
  "Genshin Impact Wish Tracker & Builds — Genshin-Info.site";

export const SITE_DESCRIPTION =
  "Track your Genshin Impact wish history, pity and pulls. Explore character builds, best weapons, artifacts and recommended stats. Free, private and stored only in your browser.";