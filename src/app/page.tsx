"use client";

import { useMemo, useState } from "react";
import type { BannerType } from "@/features/wish-history/domain/banner";
import { calculateOutcome } from "@/features/wish-history/domain/outcome";
import { sortNewestFirst } from "@/features/wish-history/domain/order";
import { calculateRarityPity } from "@/features/wish-history/domain/pity";
import { useWishHistory } from "@/features/wish-history/hooks/use-wish-history";
import { getWishRepository } from "@/features/wish-history/services/indexed-db-repository";
import { BannerTabs } from "@/features/wish-history/components/banner-tabs";
import { PitySummary } from "@/features/wish-history/components/pity-summary";
import { PityCircleGrid } from "@/features/wish-history/components/pity-circle-grid";
import { WishRow } from "@/features/wish-history/components/wish-row";
import { ImportPanel } from "@/features/import/components/import-panel";

const BANNER_ICONS: Partial<Record<BannerType, string>> = {
  character: "https://paimon.moe/images/characters/odette.png",
  weapon: "https://paimon.moe/images/weapons/whitelake_frostfeather.png",
  standard: "https://paimon.moe/images/characters/mona.png",
  novice: "https://paimon.moe/images/characters/qiqi.png",
};

export default function Home() {
  const controller = useWishHistory(getWishRepository());
  const [selectedBanner, setSelectedBanner] = useState<BannerType>("character");
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 10;

  function handleBannerSelect(banner: BannerType) {
    setSelectedBanner(banner);
    setCurrentPage(0);
  }

  const existingIds = useMemo(
    () => new Set(controller.wishes.map((w) => w.id)),
    [controller.wishes]
  );

  const pity4 = useMemo(
    () => calculateRarityPity(controller.wishes, selectedBanner, 4),
    [controller.wishes, selectedBanner]
  );

  const pity5 = useMemo(
    () => calculateRarityPity(controller.wishes, selectedBanner, 5),
    [controller.wishes, selectedBanner]
  );

  const outcome = useMemo(
    () => calculateOutcome(controller.wishes, selectedBanner),
    [controller.wishes, selectedBanner]
  );

  // Show only 4-star and 5-star wishes (3-star are stored for exact pity but
  // hidden here), newest first, capped to the last 50 of each rarity.
  const displayWishes = useMemo(() => {
    if (controller.wishes.length === 0) {
      return [];
    }
    const bannerWishes = controller.wishes.filter(
      (w) => w.bannerType === selectedBanner && w.rarity >= 4
    );
    const sorted = sortNewestFirst(bannerWishes);
    const fives = sorted.filter((w) => w.rarity === 5).slice(0, 50);
    const fours = sorted.filter((w) => w.rarity === 4).slice(0, 50);
    const byId = new Map<string, (typeof sorted)[number]>();
    for (const wish of [...fives, ...fours]) {
      byId.set(wish.id, wish);
    }
    return [...byId.values()].sort((a, b) =>
      b.timestamp.localeCompare(a.timestamp)
    );
  }, [controller.wishes, selectedBanner]);

  const totalPages = Math.max(1, Math.ceil(displayWishes.length / PAGE_SIZE));
  const pagedWishes = displayWishes.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-50">
          Genshin Wish Tracker
        </h1>
        <p className="text-sm text-zinc-500">
          Your wish history is stored locally in this browser.
        </p>
      </header>

      <ImportPanel existingIds={existingIds} onImported={controller.addImported} />

      <div className="mt-6 space-y-4">
        {controller.status === "loading" && (
          <p className="text-sm text-zinc-500">Loading wish history…</p>
        )}

        {controller.status === "error" && (
          <p
            role="alert"
            className="rounded-md border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-300"
          >
            {controller.loadError}
          </p>
        )}

        {controller.status === "ready" && controller.wishes.length === 0 && (
          <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center">
            <p className="font-medium text-zinc-300">No wish history yet</p>
            <p className="mt-1 text-sm text-zinc-500">
              Use the import box above to add your Genshin wish history.
            </p>
          </div>
        )}

        {controller.status === "ready" && controller.wishes.length > 0 && (
          <>
            <BannerTabs
              selected={selectedBanner}
              onSelect={handleBannerSelect}
              icons={BANNER_ICONS}
            />

            <PitySummary
              banner={selectedBanner}
              pity4={pity4}
              pity5={pity5}
              outcome={outcome}
            />

            <PityCircleGrid
              wishes={controller.wishes.filter(
                (wish) =>
                  wish.bannerType === selectedBanner && wish.rarity >= 4
              )}
              perWish4={pity4.perWish}
              perWish5={pity5.perWish}
            />

            <section
              aria-label="Wish history"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <h2 className="mb-3 font-medium text-zinc-100">
                Wish history
              </h2>
              {displayWishes.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No 4★ or 5★ wishes recorded for this banner yet.
                </p>
              ) : (
                <>
                  <div className="hidden grid-cols-[4.5rem_1fr_4rem_9rem] items-center gap-4 px-3 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500 sm:grid">
                    <span className="text-center">Rarity</span>
                    <span>Name</span>
                    <span className="text-center">Pity</span>
                    <span className="text-center">Date</span>
                  </div>
                  <ul className="space-y-1" aria-label="Wish history">
                    {pagedWishes.map((wish) => (
                      <WishRow
                        key={wish.id}
                        wish={wish}
                        pity={
                          wish.rarity === 4
                            ? pity4.perWish[wish.id]
                            : pity5.perWish[wish.id]
                        }
                      />
                    ))}
                  </ul>
                  {totalPages > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-4 text-sm text-zinc-400">
                      <button
                        type="button"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        &laquo; Previous
                      </button>
                      <span className="tabular-nums">
                        {currentPage + 1} / {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={currentPage >= totalPages - 1}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next &raquo;
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
