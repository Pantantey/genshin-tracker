"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import {
  COPY_SCRIPT,
  CopyScriptButton,
} from "@/features/import/components/copy-script-button";
import { ImportForm } from "@/features/import/components/import-form";
import { useWishHistory } from "@/features/wish-history/hooks/use-wish-history";
import { getWishRepository } from "@/features/wish-history/services/indexed-db-repository";
import { useLanguage } from "@/hooks/use-language";

/**
 * Step-by-step guide to import a Genshin Impact wish history. The import
 * field itself lives in step 8; the guide exists so users can review what the
 * helper script does before running it.
 */
export default function ImportPage() {
  const { t } = useLanguage();
  const controller = useWishHistory(getWishRepository());

  const existingIds = useMemo(
    () => new Set(controller.wishes.map((w) => w.id)),
    [controller.wishes]
  );

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      <h1 className="text-2xl font-semibold text-zinc-50">
        {t("import.title")}
      </h1>

      <div className="mt-4 rounded-md border border-amber-300/40 bg-amber-500/10 px-4 py-3">
        <p className="text-sm font-semibold leading-relaxed text-amber-200">
          {t("import.privacyNotice")}
        </p>
      </div>

      <p className="mt-3 text-sm font-medium text-zinc-400">
        {t("import.reminderNotice")}
      </p>

      <p className="mt-3 text-sm text-zinc-500">
        {t("import.subtitle")}
      </p>

      <ol className="mt-6 space-y-4">
        <Step number={1} title={t("import.step1Title")}>
          <p>{t("import.step1Body")}</p>
        </Step>

        <Step number={2} title={t("import.step2Title")}>
          <p>{t("import.step2Body")}</p>
        </Step>

        <Step number={3} title={t("import.step3Title")}>
          <p>{t("import.step3Body")}</p>
        </Step>

        <Step number={4} title={t("import.step4Title")}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <pre
              aria-label={t("import.scriptAria")}
              className="min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-all rounded-md border border-zinc-800 bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-300"
            >
              <code>{COPY_SCRIPT}</code>
            </pre>
            <CopyScriptButton />
          </div>
          <p className="mt-2">
            {t("import.step4Before")}{" "}
            <a
              href="https://gist.github.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-nahida-300 underline underline-offset-2 hover:text-nahida-200"
            >
              {t("import.here")}
            </a>
            .
          </p>
        </Step>

        <Step number={5} title={t("import.step5Title")}>
          <p>{t("import.step5Body")}</p>
        </Step>

        <Step number={6} title={t("import.step6Title")}>
          <p>{t("import.step6Body")}</p>
        </Step>

        <Step number={7} title={t("import.step7Title")}>
          <p>{t("import.step7Body")}</p>
        </Step>

        <Step number={8} title={t("import.step8Title")}>
          <p className="mb-3">{t("import.step8Body")}</p>
          <ImportForm
            existingIds={existingIds}
            onImported={controller.addImported}
          />
        </Step>

        <Step number={9} title={t("import.step9Title")}>
          <p className="mb-3">{t("import.step9Body")}</p>
          <Link
            href="/"
            className="inline-block rounded-md bg-nahida-500 px-4 py-2 text-sm font-medium text-nahida-100 transition-colors hover:bg-nahida-400"
          >
            {t("import.step9Button")}
          </Link>
        </Step>
      </ol>
    </main>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children?: ReactNode;
}) {
  return (
    <li className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-nahida-500 text-sm font-bold text-nahida-100"
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-zinc-100">{title}</h2>
          {children && (
            <div className="mt-2 space-y-1 text-sm text-zinc-400">
              {children}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
