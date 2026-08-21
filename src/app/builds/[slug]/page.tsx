import { notFound } from "next/navigation";
import {
  getCharacterInfo,
  getCharacterWeapons,
} from "@/features/builds/domain/characters";
import { CharacterDetail } from "@/features/builds/components/character-detail";

/** Shared dynamic-page props: `params` is a Promise in Next.js 16. */
type BuildsPageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BuildsPageParams) {
  const { slug } = await params;
  const character = getCharacterInfo(slug);
  return {
    title: character
      ? `${character.name} — Genshin-Info.site`
      : "Builds — Genshin-Info.site",
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

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      {/* The character name is rendered inside the build box; keep a visually
          hidden heading for screen readers / SEO. */}
      <h1 className="sr-only">{character.name}</h1>
      <div className="mt-6">
        <CharacterDetail character={character} weapons={weapons} />
      </div>
    </main>
  );
}