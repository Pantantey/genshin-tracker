"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, type Theme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import type { Language } from "@/lib/i18n";

/**
 * Global application header: brand on the left; on the right a light/dark
 * theme switch, a link to the Import page and a language dropdown. It is a
 * client component because of the theme/language state and the active-route
 * highlight.
 */
export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const pathname = usePathname();
  const onImport = pathname === "/import";
  const onBuilds = pathname === "/builds" || pathname.startsWith("/builds/");

  return (
    <header className="sticky top-0 z-20 border-b border-borders bg-bg-cards/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 text-text-black transition-colors hover:text-text-black"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- site icon (favicon) */}
          <img
            src="/favicon.ico"
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <span className="truncate text-lg font-semibold tracking-tight">
            Genshin-Info.site
          </span>
        </Link>

        <nav className="flex items-center gap-3" aria-label={t("header.nav")}>
          <ThemeSwitch theme={theme} onToggle={toggleTheme} />
          <Link
            href="/builds"
            aria-current={onBuilds ? "page" : undefined}
            className={`ms-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              onBuilds
                ? "bg-bg-button text-text-white"
                : "text-text-black hover:bg-borders hover:text-text-black"
            }`}
          >
            {t("header.builds")}
          </Link>
          <Link
            href="/import"
            aria-current={onImport ? "page" : undefined}
            className={`me-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              onImport
                ? "bg-bg-button text-text-white"
                : "text-text-black hover:bg-borders hover:text-text-black"
            }`}
          >
            {t("header.import")}
          </Link>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}

function ThemeSwitch({
  theme,
  onToggle,
}: {
  theme: Theme;
  onToggle: () => void;
}) {
  const { t } = useLanguage();
  const isDark = theme === "dark";
  return (
    <div
      role="group"
      aria-label={t("header.themeGroup")}
      className="flex items-center gap-1.5"
    >
      <span aria-hidden="true" className="text-text-black">
        <SunIcon />
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={t(isDark ? "header.themeToLight" : "header.themeToDark")}
        onClick={onToggle}
        // SSR always renders "light"; the hydrated value may differ, so the
        // switch is patched client-side without a hydration warning.
        suppressHydrationWarning
        className={`relative flex h-4 w-[30px] shrink-0 cursor-pointer items-center rounded-full border border-text-black bg-bg-cards/60 transition-colors ${
          isDark ? "bg-borders" : ""
        }`}
      >
        <span
          aria-hidden="true"
          suppressHydrationWarning
          className={`absolute left-[2px] top-[1px] h-3 w-3 rounded-full bg-text-black shadow transition-transform ${
            isDark ? "translate-x-[12px]" : ""
          }`}
        />
      </button>
      <span aria-hidden="true" className="text-text-black">
        <MoonIcon />
      </span>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
/**
 * Language dropdown (English / Spanish). English is the default; the choice
 * is persisted in localStorage via useLanguage.
 */
function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("header.language")}
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 items-center gap-1.5 rounded-md border border-borders bg-bg-cards/60 px-2 text-sm font-medium text-text-black transition-colors hover:bg-borders hover:text-text-black"
      >
        <GlobeIcon />
        <span className="uppercase">{lang}</span>
        <ChevronDownIcon />
      </button>

      {open && (
        <>
          {/* Click-outside backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10"
          />
          <ul
            role="listbox"
            aria-label={t("header.language")}
            className="absolute right-0 z-20 mt-1.5 min-w-[8.5rem] overflow-hidden rounded-md border border-borders bg-bg-cards py-1 shadow-lg"
          >
            {LANGUAGES.map((option) => {
              const active = option === lang;
              return (
                <li key={option} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      setLang(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-bg-button/15 font-semibold text-text-black"
                        : "text-text-black hover:bg-borders hover:text-text-black"
                    }`}
                  >
                    <span className="flex-1">
                      {option === "en" ? "English" : "Español"}
                    </span>
                    {active && <CheckIcon />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

const LANGUAGES: Language[] = ["en", "es"];

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 text-text-black"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
