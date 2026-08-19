"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";

/**
 * Helper script the user runs in PowerShell to obtain their wish-history
 * link. Displayed read-only with a copy button; the full source can be
 * reviewed on the linked gist before running it.
 */
export const COPY_SCRIPT =
  "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex \"&{$((New-Object System.Net.WebClient).DownloadString('https://gist.github.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235/raw/getlink.ps1'))} global\"";

export function CopyScriptButton() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(COPY_SCRIPT);
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      // Fixed-width + centered so the button does not change size when the
      // label toggles between "Copy script" and "Copied".
      className="min-w-[112px] shrink-0 rounded-md border border-borders bg-bg-cards/50 px-3 py-1.5 text-center text-xs font-medium text-text-black transition-colors hover:bg-borders hover:text-text-black"
    >
      {copied ? t("copy.copied") : t("copy.script")}
    </button>
  );
}