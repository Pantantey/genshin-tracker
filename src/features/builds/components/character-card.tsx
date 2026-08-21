import Link from "next/link";
import type { CharacterInfo } from "../domain/characters";

/** Compact character card: full portrait on top, name below. */
export function CharacterCard({ character }: { character: CharacterInfo }) {
  return (
    <Link
      href={`/builds/${character.slug}`}
      className="group overflow-hidden rounded-lg border border-borders bg-bg-cards/50 transition-colors hover:border-borders hover:bg-bg-cards"
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-bg-button">
        {/* eslint-disable-next-line @next/next/no-img-element -- local static asset */}
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <p className="truncate px-2 py-2 text-center text-sm font-medium text-text-black">
        {character.name}
      </p>
    </Link>
  );
}