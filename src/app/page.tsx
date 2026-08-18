"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
import { useLanguage } from "@/hooks/use-language";

export default function Home() {
  const { t } = useLanguage();
  const controller = useWishHistory(getWishRepository());
  const [selectedBanner, setSelectedBanner] = useState<BannerType>("character");
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 10;

  function handleBannerSelect(banner: BannerType) {
    setSelectedBanner(banner);
    setCurrentPage(0);
  }

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

  // The UID is an account-level value present on every wish; take the first one
  // so it can be shown in the summary without persisting it separately.
  const uid = useMemo(
    () => controller.wishes.find((wish) => wish.uid)?.uid ?? null,
    [controller.wishes]
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
      {/* The brand name is now rendered by the global Header; keep an
          accessible page heading for screen readers / SEO. */}
      <h1 className="sr-only">Genshin Wish Tracker</h1>

      <div className="mt-6 space-y-4">
        {controller.status === "loading" && (
          <p className="text-sm text-zinc-500">{t("home.loading")}</p>
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
            <p className="font-medium text-zinc-300">{t("home.emptyTitle")}</p>
            <p className="mt-1 text-sm text-zinc-500">
              {t("home.emptyBefore")}{" "}
              <Link
                href="/import"
                className="font-medium text-nahida-300 underline underline-offset-2 hover:text-nahida-200"
              >
                {t("home.emptyLink")}
              </Link>{" "}
              {t("home.emptyAfter")}
            </p>
          </div>
        )}

        {controller.status === "ready" && controller.wishes.length > 0 && (
          <>
            <div>
            <BannerTabs
              selected={selectedBanner}
              onSelect={handleBannerSelect}
            />
            <div className="overflow-hidden rounded-b-xl border border-zinc-800 border-t-0 bg-zinc-900/60">

            <PitySummary
              banner={selectedBanner}
              pity4={pity4}
              pity5={pity5}
              outcome={outcome}
              uid={uid}
              total={
                controller.wishes.filter(
                  (wish) => wish.bannerType === selectedBanner
                ).length
              }
            />
            </div>
            </div>

            <PityCircleGrid
              wishes={controller.wishes.filter(
                (wish) =>
                  wish.bannerType === selectedBanner && wish.rarity >= 4
              )}
              perWish4={pity4.perWish}
              perWish5={pity5.perWish}
              lastUpdated={controller.lastUpdated}
            />

            <section
              aria-label={t("history.title")}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-[35px] pb-4 pt-7"
            >
              <h2 className="mb-3 font-bold text-zinc-100">
                {t("history.title")}
              </h2>
              {displayWishes.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  {t("history.empty")}
                </p>
              ) : (
                <>
                  <div className="hidden grid-cols-[4.5rem_3rem_1fr_4rem_9rem] items-center gap-4 px-3 py-2 text-xs font-bold uppercase tracking-wide text-zinc-500 sm:grid">
                    <span className="text-center">{t("history.rarity")}</span>
                    <span className="text-center">{t("history.icon")}</span>
                    <span>{t("history.name")}</span>
                    <span className="text-center">{t("history.pity")}</span>
                    <span className="text-center">{t("history.date")}</span>
                  </div>
                  <ul className="space-y-1" aria-label={t("history.title")}>
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
                        &laquo; {t("pager.previous")}
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
                        {t("pager.next")} &raquo;
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
