"use client";

import { useState } from "react";
import type { Wish } from "../../wish-history/domain/wish";
import {
  importWishHistory,
  type ImportProgress,
  type ImportResult,
} from "../services/importer";

export interface ImportPanelProps {
  existingIds: ReadonlySet<string>;
  onImported: (wishes: Wish[]) => Promise<void>;
}

const COPY_SCRIPT =
  "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex \"&{$((New-Object System.Net.WebClient).DownloadString('https://gist.github.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235/raw/getlink.ps1'))} global\"";

export function ImportPanel({ existingIds, onImported }: ImportPanelProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
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
      setError(caught instanceof Error ? caught.message : "Import failed.");
    } finally {
      setImporting(false);
    }
  }

  function handleCopyScript() {
    navigator.clipboard.writeText(COPY_SCRIPT);
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <section
      aria-label="Import wish history"
      className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
    >
      <h2 className="mb-1 font-bold text-zinc-100">Import wish history</h2>
      <p className="mb-3 text-sm text-zinc-500">
        Run the helper script outside the app, open the wish history, and paste
        the link it copies here.
      </p>
      <div className="mb-3">
        <button
          type="button"
          onClick={handleCopyScript}
          className="rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          {copied ? "Copied" : "Copy script"}
        </button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <textarea
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Pegar link del resultado de pegar el script en PowerShell"
          rows={2}
          aria-label="Wish history URL"
          className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleImport}
          disabled={importing || url.trim().length === 0}
          className="rounded-md bg-nahida-500 px-4 py-2 text-sm font-medium text-nahida-100 transition-colors hover:bg-nahida-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {importing ? "Importing…" : "Import"}
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
          <p className="font-medium text-zinc-100">Import completed</p>
          <ul className="mt-1 list-inside list-disc text-zinc-400">
            <li>{result.addedCount} new wish{result.addedCount === 1 ? "" : "es"} added</li>
            <li>{result.alreadyCount} already present</li>
            <li>{result.duplicateCount} duplicates within this run</li>
            <li>{result.invalidCount} unreadable records skipped</li>
            {result.skippedGachaTypes.length > 0 && (
              <li>
                No data for banners: {result.skippedGachaTypes.join(", ")}
              </li>
            )}
          </ul>
          {result.errors.length > 0 && (
            <div className="mt-2">
              <p className="text-rose-300">
                {result.errors.length} warning
                {result.errors.length === 1 ? "" : "s"} during import:
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
    </section>
  );
}
