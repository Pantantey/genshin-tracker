"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BannerType } from "@/features/wish-history/domain/banner";
import { calculateOutcome } from "@/features/wish-history/domain/outcome";
import { sortNewestFirst } from "@/features/wish-history/domain/order";
import { calculateRarityPity } from "@/features/wish-history/domain/pity";
import { useWishHistory } from "@/features/wish-history/hooks/use-wish-history";
import { getWishRepository } from "@/features/wish-history/services/indexed-db-repository";
import { AccountSwitcher } from "@/features/wish-history/components/account-switcher";
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

  // All derived state is scoped to the active account: the tracker shows one
  // account at a time, and accounts are switched below the banner summary.
  const accountWishes = useMemo(
    () =>
      controller.activeUid
        ? controller.wishes.filter((w) => w.uid === controller.activeUid)
        : [],
    [controller.wishes, controller.activeUid]
  );

  const pity4 = useMemo(
    () => calculateRarityPity(accountWishes, selectedBanner, 4),
    [accountWishes, selectedBanner]
  );

  const pity5 = useMemo(
    () => calculateRarityPity(accountWishes, selectedBanner, 5),
    [accountWishes, selectedBanner]
  );

  const outcome = useMemo(
    () => calculateOutcome(accountWishes, selectedBanner),
    [accountWishes, selectedBanner]
  );


  // Show only 4-star and 5-star wishes (3-star are stored for exact pity but
  // hidden here), newest first, capped to the last 50 of each rarity.
  const displayWishes = useMemo(() => {
    if (accountWishes.length === 0) {
      return [];
    }
    const bannerWishes = accountWishes.filter(
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
  }, [accountWishes, selectedBanner]);

  const totalPages = Math.max(1, Math.ceil(displayWishes.length / PAGE_SIZE));
  const pagedWishes = displayWishes.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      {/* The brand name is now rendered by the global Header; keep an
          accessible page heading for screen readers / SEO. */}
      <h1 className="sr-only">Genshin-Info.site</h1>

      <div className="mt-6 space-y-4">
        {controller.status === "loading" && (
          <p className="text-sm text-text-black">{t("home.loading")}</p>
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
          <div className="rounded-lg border border-dashed border-borders p-8 text-center">
            <p className="font-medium text-text-black">{t("home.emptyTitle")}</p>
            <p className="mt-1 text-sm text-text-black">
              {t("home.emptyBefore")}{" "}
              <Link
                href="/import"
                className="font-medium text-links underline underline-offset-2 hover:text-links"
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
            <div className="overflow-hidden rounded-b-xl border border-borders border-t-0 bg-bg-cards/60">

            <PitySummary
              banner={selectedBanner}
              pity4={pity4}
              pity5={pity5}
              outcome={outcome}
              total={
                accountWishes.filter(
                  (wish) => wish.bannerType === selectedBanner
                ).length
              }
            />
            <AccountSwitcher
              accounts={controller.accounts}
              activeUid={controller.activeUid}
              onSelect={controller.switchAccount}
            />
            </div>
            </div>

            <PityCircleGrid
              wishes={accountWishes.filter(
                (wish) =>
                  wish.bannerType === selectedBanner && wish.rarity >= 4
              )}
              perWish4={pity4.perWish}
              perWish5={pity5.perWish}
              lastUpdated={controller.lastUpdated}
            />

                        <div className="rounded-lg border border-borders bg-bg-cards/60 px-4 py-4 text-center">
              <p className="text-sm font-medium text-text-black">
                {t("ko-fi.title")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-black">
                {t("ko-fi.body")}
              </p>
              <a
                href="https://ko-fi.com/genshininfo"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-tab-inactive-bg px-3 py-1.5 text-sm font-medium text-text-black transition-colors hover:bg-borders"
              >
                <KofiIcon />
                {t("ko-fi.link")}
              </a>
            </div>

            <section
              aria-label={t("history.title")}
              className="rounded-lg border border-borders bg-bg-cards/50 px-[35px] pb-4 pt-7"
            >
              <h2 className="mb-3 font-bold text-text-black">
                {t("history.title")}
              </h2>
              {displayWishes.length === 0 ? (
                <p className="text-sm text-text-black">
                  {t("history.empty")}
                </p>
              ) : (
                <>
                  <div className="hidden grid-cols-[4.5rem_3rem_1fr_4rem_9rem] items-center gap-4 px-3 py-2 text-xs font-bold uppercase tracking-wide text-text-black sm:grid">
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
                    <div className="mt-3 flex items-center justify-center gap-4 text-sm text-text-black">
                      <button
                        type="button"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="rounded-md border border-borders bg-bg-cards/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
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
                        className="rounded-md border border-borders bg-bg-cards/40 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
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
function KofiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}