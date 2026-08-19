import type { WishRarity } from "../domain/wish";

const STYLES: Record<WishRarity, string> = {
  3: "border-placeholder/70 bg-borders text-text-black",
  4: "border-rarity-4-star/70 bg-bg-rarity-4-star/60 text-rarity-4-star",
  5: "border-border-5-star bg-border-5-star/15 text-rarity-5-star",
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
