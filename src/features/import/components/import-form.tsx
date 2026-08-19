"use client";

import { useState } from "react";
import type { Wish } from "../../wish-history/domain/wish";
import type { ImportMode } from "../../wish-history/hooks/use-wish-history";
import {
  importWishHistory,
  type ImportProgress,
  type ImportResult,
} from "../services/importer";
import { useLanguage } from "@/hooks/use-language";

/**
 * The import field: paste the wish-history link PowerShell returned, then
 * click Import. Renders live progress, a summary and any warnings. It is the
 * same field that used to live on the home page, extracted so the Import page
 * can present it as a step of its own guide.
 *
 * Before anything is persisted, the importer detects the account (uid) of the
 * fetched history and asks for confirmation: a new uid is offered to be saved
 * as a new account, an already-saved uid can be fully replaced or just
 * extended with the new pulls.
 */
export interface ImportFormProps {
  existingIds: ReadonlySet<string>;
  /** Uids already saved locally, used to decide the import mode before persisting. */
  existingUids: ReadonlySet<string>;
  onImported: (wishes: Wish[], mode?: ImportMode) => Promise<void>;
}

interface PendingImport {
  kind: "newAccount" | "existing";
  uid: string;
  /** Every wish fetched for the detected account (used to store a new account). */
  allWishes: Wish[];
  /** Only the wishes that are genuinely new (used by the append mode). */
  newWishes: Wish[];
}

export function ImportForm({
  existingIds,
  existingUids,
  onImported,
}: ImportFormProps) {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<ImportProgress | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingImport | null>(null);

  async function handleImport() {
    const trimmed = url.trim();
    if (!trimmed || importing) {
      return;
    }

    setImporting(true);
    setError(null);
    setResult(null);
    setProgress(null);

    try {
      const res = await importWishHistory(trimmed, existingIds, setProgress);
      setResult(res);
      const uid = res.fetchedWishes[0]?.uid ?? null;
      if (uid) {
        setPending({
          kind: existingUids.has(uid) ? "existing" : "newAccount",
          uid,
          allWishes: res.fetchedWishes,
          newWishes: res.wishes,
        });
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("form.failed"));
    } finally {
      setImporting(false);
    }
  }

  async function confirmPending() {
    const action = pending;
    setPending(null);
    if (!action) {
      return;
    }
    try {
      if (action.kind === "newAccount") {
        // A brand-new account stores the full fetched history.
        await onImported(action.allWishes, "replace");
      } else if (action.newWishes.length > 0) {
        // An already-saved account always appends the new pulls.
        await onImported(action.newWishes, "append");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("form.failed"));
    }
  }

  function cancelPending() {
    setPending(null);
  }

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <textarea
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder={t("form.placeholder")}
          rows={2}
          aria-label={t("form.ariaLabel")}
          className="flex-1 rounded-md border border-borders bg-bg-cards px-3 py-2 text-sm text-text-black placeholder:text-placeholder focus:border-placeholder focus:outline-none"
        />
        <button
          type="button"
          onClick={handleImport}
          disabled={importing || url.trim().length === 0}
          className="rounded-md bg-bg-button px-4 py-2 text-sm font-medium text-text-white transition-colors hover:bg-bg-button disabled:cursor-not-allowed disabled:opacity-50"
        >
          {importing ? t("form.importing") : t("form.import")}
        </button>
      </div>

      {progress && importing && (
        <p className="mt-3 text-sm tabular-nums text-text-black">
          {progress.banner} · page {progress.page + 1} ·{" "}
          {progress.processed} processed
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-md border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-300"
        >
          {error}
        </p>
      )}

      {result && !importing && (
        <div className="mt-3 rounded-md border border-borders bg-bg-cards/60 px-3 py-2 text-sm text-text-black">
          <p className="font-medium text-text-black">{t("form.completed")}</p>
          <ul className="mt-1 list-inside list-disc text-text-black">
            <li>
              {result.addedCount}{" "}
              {t(result.addedCount === 1 ? "form.addedWish" : "form.addedWishes")}
            </li>
            <li>
              {result.alreadyCount} {t("form.already")}
            </li>
            <li>
              {result.duplicateCount} {t("form.duplicates")}
            </li>
            <li>
              {result.invalidCount} {t("form.invalid")}
            </li>
            {result.skippedGachaTypes.length > 0 && (
              <li>
                {t("form.noData")} {result.skippedGachaTypes.join(", ")}
              </li>
            )}
          </ul>
          {result.errors.length > 0 && (
            <div className="mt-2">
              <p className="text-rose-300">
                {result.errors.length}{" "}
                {t(
                  result.errors.length === 1
                    ? "form.warning"
                    : "form.warnings"
                )}{" "}
                {t("form.duringImport")}
              </p>
              <ul className="mt-1 space-y-0.5 text-xs text-rose-400/90">
                {result.errors.map((message, index) => (
                  <li key={index} className="break-words">
                    · {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {pending && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            aria-hidden="true"
            onClick={cancelPending}
            className="absolute inset-0 bg-black/60"
          />
          <div className="relative w-full max-w-md rounded-lg border border-borders bg-bg-cards p-5 shadow-xl">
            <h3 id="import-dialog-title" className="font-semibold text-text-black">
              {pending.kind === "newAccount"
                ? t("form.newAccountTitle")
                : t("form.accountExistsTitle")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-black">
              {pending.kind === "newAccount"
                ? t("form.newAccountBody").replace("{uid}", pending.uid)
                : t("form.accountExistsBody").replace("{uid}", pending.uid)}
            </p>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={cancelPending}
                className="rounded-md border border-borders bg-bg-cards/50 px-3 py-1.5 text-sm font-medium text-text-black transition-colors hover:bg-borders hover:text-text-black"
              >
                {t("form.cancel")}
              </button>
              <button
                type="button"
                onClick={confirmPending}
                className="rounded-md bg-bg-button px-3 py-1.5 text-sm font-medium text-text-white transition-colors hover:bg-bg-button"
              >
                {pending.kind === "newAccount"
                  ? t("form.add")
                  : t("form.update")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}