"use client";

import { useState } from "react";
import type { Wish } from "../../wish-history/domain/wish";
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
 */
export interface ImportFormProps {
  existingIds: ReadonlySet<string>;
  onImported: (wishes: Wish[]) => Promise<void>;
}

export function ImportForm({ existingIds, onImported }: ImportFormProps) {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<ImportProgress | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      if (res.wishes.length > 0) {
        await onImported(res.wishes);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("form.failed"));
    } finally {
      setImporting(false);
    }
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
          className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleImport}
          disabled={importing || url.trim().length === 0}
          className="rounded-md bg-nahida-500 px-4 py-2 text-sm font-medium text-nahida-100 transition-colors hover:bg-nahida-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {importing ? t("form.importing") : t("form.import")}
        </button>
      </div>

      {progress && importing && (
        <p className="mt-3 text-sm tabular-nums text-zinc-400">
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
        <div className="mt-3 rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-300">
          <p className="font-medium text-zinc-100">{t("form.completed")}</p>
          <ul className="mt-1 list-inside list-disc text-zinc-400">
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
    </div>
  );
}