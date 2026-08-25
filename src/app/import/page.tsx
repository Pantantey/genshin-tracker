"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Modal } from "@/components/modal";
import {
  COPY_SCRIPT,
  CopyScriptButton,
} from "@/features/import/components/copy-script-button";
import { ImportForm } from "@/features/import/components/import-form";
import { useWishHistory } from "@/features/wish-history/hooks/use-wish-history";
import { getWishRepository } from "@/features/wish-history/services/indexed-db-repository";
import { useLanguage } from "@/hooks/use-language";
import type { TranslationKey } from "@/lib/i18n";

/**
 * Step-by-step guide to import a Genshin Impact wish history. The import
 * field itself lives in step 8; the guide exists so users can review what the
 * helper script does before running it.
 */
export default function ImportPage() {
  const { t } = useLanguage();
  const controller = useWishHistory(getWishRepository());
  const [faqOpen, setFaqOpen] = useState(false);

  const existingIds = useMemo(
    () => new Set(controller.wishes.map((w) => w.id)),
    [controller.wishes]
  );

  const existingUids = useMemo(
    () => new Set(controller.accounts.map((a) => a.uid)),
    [controller.accounts]
  );

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      <h1 className="text-2xl font-semibold text-text-black">
        {t("import.title")}
      </h1>

      <div className="mt-4 rounded-md border border-rarity-5-star/40 bg-border-5-star/10 px-4 py-3">
        <p className="text-sm font-semibold leading-relaxed text-important-text">
          {t("import.privacyNotice")}
        </p>
      </div>

      <p className="mt-3 text-sm font-medium text-text-black">
        {t("import.reminderNotice")}
      </p>

      <button
        type="button"
        onClick={() => setFaqOpen(true)}
        className="mt-3 rounded-md border border-borders bg-bg-cards/60 px-3 py-1.5 text-sm font-medium text-text-black transition-colors hover:bg-borders hover:text-text-black"
      >
        {t("import.faq" as TranslationKey)}
      </button>

      <p className="mt-3 text-sm text-text-black">
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
              className="min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-all rounded-md border border-borders bg-bg-cards p-3 text-xs leading-relaxed text-text-black"
            >
              <code>{COPY_SCRIPT}</code>
            </pre>
            <CopyScriptButton />
          </div>
          <p className="mt-2">
            {t("import.step4Before")}{" "}
            <a
              href="https://gist.github.com/Pantantey/18c3abfc51fe97f14552474aef4efbee"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-links underline underline-offset-2 hover:text-links"
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
            existingUids={existingUids}
            onImported={controller.addImported}
          />
        </Step>

        <Step number={9} title={t("import.step9Title")}>
          <p className="mb-3">{t("import.step9Body")}</p>
          <Link
            href="/"
            className="inline-block rounded-md bg-bg-button px-4 py-2 text-sm font-medium text-text-white transition-colors hover:bg-bg-button"
          >
            {t("import.step9Button")}
          </Link>
        </Step>
      </ol>

      <Modal
        open={faqOpen}
        title={t("import.faqTitle" as TranslationKey)}
        onClose={() => setFaqOpen(false)}
      >
        <div className="space-y-4">
          <FaqItem
            question={t("import.faqQ1" as TranslationKey)}
            answer={t("import.faqA1" as TranslationKey)}
          />
          <FaqItem
            question={t("import.faqQ2" as TranslationKey)}
            answer={t("import.faqA2" as TranslationKey)}
          />
          <FaqItem
            question={t("import.faqQ3" as TranslationKey)}
            answer={t("import.faqA3" as TranslationKey)}
          />
        </div>
      </Modal>
    </main>
  );
}

/** One question/answer pair inside the FAQ modal. */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-black">{question}</h3>
      <p className="mt-1 text-sm leading-relaxed text-text-black/90">{answer}</p>
    </div>
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
    <li className="rounded-lg border border-borders bg-bg-cards/50 p-4">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-button text-sm font-bold text-text-white"
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-text-black">{title}</h2>
          {children && (
            <div className="mt-2 space-y-1 text-sm text-text-black">
              {children}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
