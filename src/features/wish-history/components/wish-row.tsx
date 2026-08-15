import type { Wish } from "../domain/wish";
import { RarityBadge } from "./rarity-badge";

export interface WishRowProps {
  wish: Wish;
  /** Pity at which this wish occurred, when known. */
  pity?: number;
}

export function WishRow({ wish, pity }: WishRowProps) {
  const isFiveStar = wish.rarity === 5;
  return (
    <li
      className={`grid grid-cols-[4.5rem_1fr_4rem_9rem] items-center gap-4 rounded-md border px-3 py-2 ${
        isFiveStar
          ? "border-amber-500/40 bg-amber-500/[0.05]"
          : "border-zinc-800 bg-zinc-900/40"
      }`}
    >
      <span className="justify-self-center">
        <RarityBadge rarity={wish.rarity} />
      </span>
      <p
        className={`truncate ${
          isFiveStar ? "font-semibold text-amber-100" : "text-zinc-200"
        }`}
      >
        {wish.name}
      </p>
      <span className="text-center text-xs tabular-nums text-zinc-400">
        {typeof pity === "number" ? pity : ""}
      </span>
      <span className="text-center text-xs tabular-nums text-zinc-500">
        {formatDateTime(wish.timestamp)}
      </span>
    </li>
  );
}

function formatDateTime(timestamp: string): string {
  return timestamp.replace("T", " ").slice(0, 16);
}