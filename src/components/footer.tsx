"use client";

import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 border-t border-zinc-800 bg-zinc-950/60 px-4 py-8">
      <div className="px-4 mx-auto flex w-full max-w-4xl flex-col gap-8 sm:flex-row sm:justify-between">

        <div className="max-w-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {t("footer.resources")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {t("footer.disclaimer")}
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {t("footer.support")}
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            <li>
              <a
                href="https://paypal.me/YourHandle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-100"
              >
                {t("footer.donate")}
              </a>
            </li>
            <li>
              <a
                href="https://ko-fi.com/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-100"
              >
                {t("footer.coffee")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {t("footer.contact")}
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            <li>
              <a href="mailto:contact@genshintracker.com" className="hover:text-zinc-100">
                contact@genshintracker.com
              </a>
            </li>
          </ul>
        </div>


      </div>

      <div className="mx-auto mt-8 max-w-4xl border-t border-zinc-800 pt-4 text-center">
        <p className="text-sm font-medium text-zinc-300">&copy; 2026 Genshin Tracker</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-500">
          {t("footer.tagline")}
        </p>
      </div>
    </footer>
  );
}