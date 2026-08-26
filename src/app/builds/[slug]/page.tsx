import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCharacterInfo,
  getCharacterWeapons,
  type CharacterInfo,
} from "@/features/builds/domain/characters";
import type { Element } from "@/features/builds/data/characters-data";
import { CharacterDetail } from "@/features/builds/components/character-detail";
import { SITE_URL } from "@/lib/site";

/** Shared dynamic-page props: `params` is a Promise in Next.js 16. */
type BuildsPageParams = { params: Promise<{ slug: string }> };

/** Human-readable element labels used to build keyword-rich descriptions. */
const ELEMENT_LABELS: Record<Element, string> = {
  anemo: "Anemo (wind)",
  cryo: "Cryo (ice)",
  dendro: "Dendro (nature)",
  electro: "Electro (lightning)",
  geo: "Geo (earth)",
  hydro: "Hydro (water)",
  pyro: "Pyro (fire)",
};

/** Keyword-rich meta description for a single character page. */
function buildDescription(character: CharacterInfo): string {
  const element = ELEMENT_LABELS[character.element];
  return `Best ${character.name} build for Genshin Impact: recommended weapons, artifact sets, main stats, and talent priorities for this ${character.rarity}-star ${character.weaponType} (${element}) character.`;
}

export async function generateMetadata({
  params,
}: BuildsPageParams): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterInfo(slug);
  if (!character) {
    return {
      title: "Builds — Genshin-Info.site",
      description: "Character builds for Genshin Impact.",
    };
  }
  return {
    title: `${character.name} Build — Genshin-Info.site`,
    description: buildDescription(character),
    alternates: { canonical: `/builds/${character.slug}` },
  };
}

export default async function CharacterBuildPage({
  params,
}: BuildsPageParams) {
  const { slug } = await params;
  const character = getCharacterInfo(slug);
  if (!character) {
    notFound();
  }

  const weapons = getCharacterWeapons(slug) ?? [];

  /** Breadcrumb structured data for this single character page. */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Genshin-Info.site",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Builds",
        item: `${SITE_URL}/builds`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: character.name,
        item: `${SITE_URL}/builds/${character.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      {/* JSON-LD structured data (the head tags are handled by the Metadata API). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* The character name is rendered inside the build box; keep a visually
          hidden heading for screen readers / SEO. */}
      <h1 className="sr-only">{character.name}</h1>
      <div className="mt-6">
        <CharacterDetail character={character} weapons={weapons} />
      </div>
    </main>
  );
}