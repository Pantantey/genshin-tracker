"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";

/**
 * Helper script the user runs in PowerShell to obtain their wish-history
 * link. Displayed read-only with a copy button; the full source can be
 * reviewed on the linked gist before running it.
 */
export const COPY_SCRIPT =
  "Set-ExecutionPolicy Bypass -Scope Process -Force; [Net.ServicePointManager]::SecurityProtocol=([Net.ServicePointManager]::SecurityProtocol -bor 3072); $u='https://gist.githubusercontent.com/Pantantey/18c3abfc51fe97f14552474aef4efbee/raw/historyImporter.ps1'; $t=$env:TEMP+'\\gwt-imp.ps1'; Invoke-WebRequest -Uri $u -UseBasicParsing -OutFile $t; & $t";

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
      className="min-w-[112px] shrink-0 cursor-pointer rounded-md border border-borders bg-bg-cards/50 px-3 py-1.5 text-center text-xs font-medium text-text-black transition-colors hover:bg-borders hover:text-text-black"
    >
      {copied ? t("copy.copied") : t("copy.script")}
    </button>
  );
}