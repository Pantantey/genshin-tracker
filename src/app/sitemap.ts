import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllCharacters } from "@/features/builds/domain/characters";

/**
 * sitemap.xml — lists the static routes plus every character build page.
 * Each character is an indexable URL with its own search intent, so include
 * all of them. Cached by Next.js by default (no request-time APIs are used).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const characters = getAllCharacters();

  return [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/builds`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/import`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...characters.map((character) => ({
      url: `${SITE_URL}/builds/${character.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}