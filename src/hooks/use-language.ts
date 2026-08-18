"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import {
  messages,
  translate,
  type Language,
  type TranslationKey,
} from "@/lib/i18n";

const STORAGE_KEY = "gwt-lang";

/**
 * Module-level store for the selected UI language (English by default).
 * Uses the same `useSyncExternalStore` pattern as the theme hook so that
 * hydration always matches (server snapshot is "en") and the real stored
 * value is applied right after hydration.
 */
let currentLang: Language =
  typeof window === "undefined" ? "en" : resolveStoredLang();

type Listener = () => void;
const listeners = new Set<Listener>();

function resolveStoredLang(): Language {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

function emitLanguageChange(): void {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Language {
  return currentLang;
}

/** Server snapshot: English (the default). */
function getServerSnapshot(): Language {
  return "en";
}

function applyLanguage(next: Language): void {
  currentLang = next;
  document.documentElement.lang = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Persistence is best-effort (e.g. blocked storage); the live value stays.
  }
  emitLanguageChange();
}

export interface LanguageController {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export function useLanguage(): LanguageController {
  const lang = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Keep <html lang="…"> in sync with the selected language.
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey) =>
      messages[key] ? translate(key, lang) : (key as string),
    [lang]
  );

  const setLang = useCallback((next: Language) => {
    applyLanguage(next);
  }, []);

  return { lang, setLang, t };
}