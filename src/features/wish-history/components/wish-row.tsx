"use client";

import { useState } from "react";
import Link from "next/link";
import type { Wish } from "../domain/wish";
import { getItemIcon, itemInitials } from "../domain/item-icons";
import { RarityBadge } from "./rarity-badge";
import { getCharacterBuildUrl } from "@/features/builds/domain/characters";

export interface WishRowProps {
  wish: Wish;
  /** Pity at which this wish occurred, when known. */
  pity?: number;
}

export function WishRow({ wish, pity }: WishRowProps) {
  const isFiveStar = wish.rarity === 5;
  const iconUrl = getItemIcon(wish.name, wish.itemType);
  // Only characters link to their build page; weapons stay non-clickable.
  const buildUrl =
    wish.itemType === "character" ? getCharacterBuildUrl(wish.name) : null;

  const cells = (
    <>
      <span className="justify-self-center">
        <RarityBadge rarity={wish.rarity} />
      </span>
      <span className="justify-self-center">
        <WishItemIcon wish={wish} iconUrl={iconUrl} />
      </span>
      <p
        className={`truncate ${
          isFiveStar ? "font-semibold text-wish-name" : "text-text-black"
        }`}
      >
        {wish.name}
      </p>
      <span className="text-center text-xs tabular-nums text-text-black">
        {typeof pity === "number" ? pity : ""}
      </span>
      <span className="text-center text-xs tabular-nums text-text-black">
        {formatDateTime(wish.timestamp)}
      </span>
    </>
  );

  return (
    <li
      className={`grid grid-cols-[4.5rem_3rem_1fr_4rem_9rem] items-center gap-4 rounded-md border px-3 py-2 ${
        isFiveStar
          ? "border-border-5-star/40 bg-bg-5-star"
          : "border-borders bg-bg-cards/40"
      }`}
    >
      {buildUrl ? (
        <Link
          href={buildUrl}
          className="contents"
          aria-label={`${wish.name} build page`}
        >
          {cells}
        </Link>
      ) : (
        cells
      )}
    </li>
  );
}

/** Circular item thumbnail. Initials only appear when no icon is available. */
function WishItemIcon({ wish, iconUrl }: { wish: Wish; iconUrl: string | null }) {
  const [broken, setBroken] = useState(false);
  const showFallback = iconUrl === null || broken;
  return (
    <span
      aria-hidden="true"
      className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-borders bg-bg-icons text-[10px] font-semibold text-text-black"
    >
      {showFallback ? itemInitials(wish.name) : null}
      {iconUrl && !broken && (
        // eslint-disable-next-line @next/next/no-img-element -- local asset, initials fallback
        <img
          src={iconUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      )}
    </span>
  );
}

function formatDateTime(timestamp: string): string {
  return timestamp.replace("T", " ").slice(0, 16);
}