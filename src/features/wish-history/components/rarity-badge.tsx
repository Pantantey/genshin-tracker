import type { WishRarity } from "../domain/wish";

const STYLES: Record<WishRarity, string> = {
  3: "border-zinc-600/70 bg-zinc-800/60 text-zinc-300",
  4: "border-indigo-600/70 bg-indigo-950/60 text-indigo-300",
  5: "border-amber-500 bg-amber-500/15 text-amber-300",
};

export function RarityBadge({ rarity }: { rarity: WishRarity }) {
  return (
    <span
      aria-label={`${rarity} star`}
      className={`inline-flex h-6 min-w-8 items-center justify-center rounded border px-1 text-xs font-semibold tabular-nums ${STYLES[rarity]}`}
    >
      {rarity}★
    </span>
  );
}
