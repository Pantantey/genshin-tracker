"use client";

import { useState } from "react";
import type { Wish } from "../domain/wish";
import { getItemIcon, itemInitials } from "../domain/item-icons";

type RarityFilter = "all" | 4 | 5;

export interface PityCircleGridProps {
  /** Wishes of the selected banner, only 4★ and 5★. */
  wishes: Wish[];
  /** Pity per wish id for the 4-star counter. */
  perWish4: Record<string, number>;
  /** Pity per wish id for the 5-star counter. */
  perWish5: Record<string, number>;
}

const FILTERS: { value: RarityFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: 4, label: "4★" },
  { value: 5, label: "5★" },
];

export function PityCircleGrid({
  wishes,
  perWish4,
  perWish5,
}: PityCircleGridProps) {
  const [filter, setFilter] = useState<RarityFilter>(5);

  const visible = [...wishes]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .filter((wish) => filter === "all" || wish.rarity === filter);

  return (
    <section
      aria-label="Pull history"
      className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-medium text-zinc-100">Pull history</h2>
        <div
          role="group"
          aria-label="Filter pulls"
          className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-950/60 p-1"
        >
          {FILTERS.map(({ value, label }) => {
            const active = filter === value;
            return (
              <button
                key={String(value)}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(value)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "bg-zinc-700 text-zinc-50"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">
          No pulls match this filter yet.
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-4">
          {visible.map((wish) => (
            <PityCircle
              key={wish.id}
              wish={wish}
              pity={
                wish.rarity === 4 ? perWish4[wish.id] : perWish5[wish.id]
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

function PityCircle({ wish, pity }: { wish: Wish; pity?: number }) {
  const isFive = wish.rarity === 5;
  const [broken, setBroken] = useState(false);
  const iconUrl = getItemIcon(wish.name, wish.itemType);
  const showIcon = iconUrl !== null && !broken;
  const pityValue = pity ?? 0;

  return (
    <div
      className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 ${
        isFive
          ? "border-amber-500 bg-amber-500/10"
          : "border-indigo-500 bg-indigo-500/10"
      }`}
      title={wish.name}
    >
      {showIcon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt={wish.name}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-11 w-11 rounded-full object-cover"
        />
      ) : (
        <span
          className={`text-sm font-semibold ${
            isFive ? "text-amber-200" : "text-indigo-200"
          }`}
        >
          {itemInitials(wish.name)}
        </span>
      )}
      <span
        className={`absolute -bottom-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ${pityColorClass(
          wish.rarity,
          pityValue
        )}`}
      >
        {pityValue}
      </span>
    </div>
  );
}

/**
 * Color the pity badge according to rarity thresholds.
 * 5★: <26 green, 26-59 orange, 60+ red.
 * 4★: 1-3 green, 4-7 orange, 8+ red.
 */
function pityColorClass(rarity: Wish["rarity"], pity: number): string {
  if (rarity === 5) {
    if (pity < 26) return "bg-emerald-500";
    if (pity <= 59) return "bg-orange-500";
    return "bg-red-500";
  }
  if (pity <= 3) return "bg-emerald-500";
  if (pity <= 7) return "bg-orange-500";
  return "bg-red-500";
}
