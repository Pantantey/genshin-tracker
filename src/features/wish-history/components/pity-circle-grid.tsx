"use client";

import { useState } from "react";
import type { Wish } from "../domain/wish";
import { getItemIcon, itemInitials } from "../domain/item-icons";

type RarityFilter = "all" | 4 | 5;

const PAGE_SIZE = 30;

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
  const [page, setPage] = useState(0);

  const visible = [...wishes]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .filter((wish) => filter === "all" || wish.rarity === filter);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paged = visible.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  return (
    <section
      aria-label="Pull history"
      className="px-[38px] flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-bold text-zinc-100">Pull history</h2>
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
                onClick={() => {
                  setFilter(value);
                  setPage(0);
                }}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-nahida-500 text-nahida-100"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {paged.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">
          No pulls match this filter yet.
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap justify-start gap-4">
          {paged.map((wish) => (
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

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 border-t border-zinc-800 pt-3 text-sm text-zinc-400">
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
          >
            &laquo; Previous
          </button>
          <span className="tabular-nums">
            {safePage + 1} / {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next &raquo;
          </button>
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
      className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 ${
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
          className="h-14 w-14 rounded-full object-cover"
        />
      ) : (
        <span
          className={`text-base font-semibold ${
            isFive ? "text-amber-200" : "text-indigo-200"
          }`}
        >
          {itemInitials(wish.name)}
        </span>
      )}
      <span
        className={`absolute -bottom-1 -right-1 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-black px-1.5 text-xs font-bold text-white ${pityColorClass(
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