"use client";

import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 border-t border-borders bg-bg-cards/60 px-4 py-8">
      <div className="px-4 mx-auto flex w-full max-w-4xl flex-col gap-8 sm:flex-row sm:justify-between">

        <div className="max-w-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-black">
            {t("footer.resources")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-black">
            {t("footer.disclaimer")}
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-black">
            {t("footer.support")}
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-text-black">
            <li>
              <a
                href="https://ko-fi.com/genshininfo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-placeholder transition-colors hover:text-link-hover"
              >
                {t("footer.coffee")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-black">
            {t("footer.contact")}
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-text-black">
            <li>
              <a href="mailto:GenshinInfoSite@gmail.com" className="text-placeholder transition-colors hover:text-link-hover">
                GenshinInfoSite@gmail.com
              </a>
            </li>
            <li>
              <a href="https://discord.gg/Sx56ass5P" className="text-placeholder transition-colors hover:text-link-hover">
                Discord
              </a>
            </li>
          </ul>
        </div>


      </div>
    </footer>
  );
}