#!/usr/bin/env node
/**
 * Cache Genshin wish-history assets locally.
 *
 * Fetches the CURRENT character/weapon catalog from Paimon.moe's data files
 * (so new characters are picked up automatically), then downloads each icon
 * from the Paimon.moe image CDN into `public/icons/{type}/{slug}.png`.
 *
 * Additionally, it downloads the FULL character portrait (non-event artwork)
 * into `public/full/characters/{slug}.png`, matching the path the banner
 * summary uses (`/full/characters/...`). We only cache full characters, since
 * Paimon.moe has no equivalent full artwork for weapons.
 *
 * Incremental: files that already exist are skipped.
 *
 * Run from the project root:
 *   node scripts/cache-icons.mjs
 *
 * Requires no dependencies. If the catalog cannot be fetched (offline/CDN
 * blocked), the script fails loudly instead of silently caching nothing.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ICONS_DIR = path.join(ROOT, "public", "icons");
const FULL_CHARACTERS_DIR = path.join(ROOT, "public", "full", "characters");

const DATA_BASE =
  "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data";
const CDN = "https://paimon.moe/images";
const CONCURRENCY = 8;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const CATALOGS = [
  { file: "characters.js", type: "characters" },
  { file: "weaponList.js", type: "weapons" },
];

/** Top-level object keys (2-space indent, optionally quoted) are icon slugs. */
function extractSlugs(content) {
  const slugs = [];
  // Keys may be quoted ('mountain-bracing_bolt': {) when they contain a hyphen.
  const re = /^  '?([a-z0-9_-]+)'?: \{/gm;
  let match = null;
  while ((match = re.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

async function fetchCatalog(file) {
  const response = await fetch(`${DATA_BASE}/${file}`, {
    headers: { "User-Agent": UA, Accept: "*/*" },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${file}`);
  }
  return extractSlugs(await response.text());
}

/** Download one icon; returns true on success. */
async function downloadIcon(slug, type, target) {
  return downloadImage(`${CDN}/${type}/${slug}.png`, target);
}

/** Download a character's full portrait into `public/full/characters`. */
async function downloadFullCharacter(slug, target) {
  return downloadImage(`${CDN}/characters/full/${slug}.png`, target);
}

/** Fetch one image and write it to disk; returns true on success. */
async function downloadImage(url, target) {
  let response;
  try {
    response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "image/*",
        Referer: "https://paimon.moe/",
      },
    });
  } catch {
    return false;
  }

  // The CDN returns HTTP 200 with an HTML page for missing assets — only
  // save actual images.
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !contentType.startsWith("image/")) {
    return false;
  }

  await fs.writeFile(target, Buffer.from(await response.arrayBuffer()));
  return true;
}

async function main() {
  await fs.mkdir(path.join(ICONS_DIR, "characters"), { recursive: true });
  await fs.mkdir(path.join(ICONS_DIR, "weapons"), { recursive: true });
  await fs.mkdir(FULL_CHARACTERS_DIR, { recursive: true });

  const catalogErrors = [];
  const items = [];

  for (const { file, type } of CATALOGS) {
    try {
      const slugs = await fetchCatalog(file);
      for (const slug of slugs) {
        items.push({ slug, type });
      }
      console.log(`Catalog ${file}: ${slugs.length} items`);
    } catch (error) {
      catalogErrors.push(`${file}: ${error.message}`);
    }
  }

  if (items.length === 0) {
    console.error("Could not fetch the icon catalog:");
    for (const error of catalogErrors) {
      console.error("  -", error);
    }
    console.error(
      "Check your internet connection and retry. Nothing was downloaded."
    );
    process.exit(1);
  }

  let index = 0;
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  const failedList = [];

  async function worker() {
    while (true) {
      const current = index++;
      if (current >= items.length) {
        return;
      }
      const { slug, type } = items[current];
      const target = path.join(ICONS_DIR, type, `${slug}.png`);
      try {
        await fs.access(target);
        skipped += 1;
      } catch {
        if (await downloadIcon(slug, type, target)) {
          downloaded += 1;
        } else {
          failed += 1;
          failedList.push(`${type}/${slug}`);
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  // --- Full character portraits (public/full/characters) ---
  // Cache the full, non-event artwork for every character in the catalog.
  const characterSlugs = items
    .filter((item) => item.type === "characters")
    .map((item) => item.slug);

  let fullDownloaded = 0;
  let fullSkipped = 0;
  let fullFailed = 0;
  const fullFailedList = [];

  let fullIndex = 0;
  async function fullWorker() {
    while (true) {
      const current = fullIndex++;
      if (current >= characterSlugs.length) {
        return;
      }
      const slug = characterSlugs[current];
      const target = path.join(FULL_CHARACTERS_DIR, `${slug}.png`);
      try {
        await fs.access(target);
        fullSkipped += 1;
      } catch {
        if (await downloadFullCharacter(slug, target)) {
          fullDownloaded += 1;
        } else {
          fullFailed += 1;
          fullFailedList.push(slug);
        }
      }
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => fullWorker())
  );

  console.log(
    `\nDone — downloaded: ${downloaded}, already present: ${skipped}, failed: ${failed}`
  );
  console.log(
    `Full characters — downloaded: ${fullDownloaded}, already present: ${fullSkipped}, failed: ${fullFailed}`
  );
  if (catalogErrors.length > 0) {
    console.log("Catalog warnings (continued anyway):");
    for (const error of catalogErrors) {
      console.log("  -", error);
    }
  }
  if (failedList.length > 0) {
    console.log("Failed (missing/broken on the CDN, initials will be used):");
    console.log(failedList.slice(0, 50).join(", "));
    if (failedList.length > 50) {
      console.log(`  … and ${failedList.length - 50} more`);
    }
  }
  if (fullFailedList.length > 0) {
    console.log("Failed full portraits (not on the CDN for these characters):");
    console.log(fullFailedList.slice(0, 50).join(", "));
    if (fullFailedList.length > 50) {
      console.log(`  … and ${fullFailedList.length - 50} more`);
    }
  }
}

await main();