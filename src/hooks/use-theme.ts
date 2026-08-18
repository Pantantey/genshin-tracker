"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "gwt-theme";

/**
 * Resolve the stored theme (localStorage). Without a stored value the
 * application defaults to DARK (the `:root` palette is dark), even if the
 * operating system prefers a light color scheme.
 */
function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : "dark";
}

/**
 * Tiny module-level store for the theme. Keeping the value outside of React
 * state means the switch can be hydrated from a stable server snapshot
 * ("dark", the default) and then immediately updated with the real stored
 * theme, so a reload always shows the theme the user actually picked — no
 * mismatch between the switch and the page.
 */
let currentTheme: Theme =
  typeof window === "undefined" ? "dark" : resolveInitialTheme();

type Listener = () => void;
const listeners = new Set<Listener>();

function emitThemeChange(): void {
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

/** Client snapshot: the real current theme. */
function getSnapshot(): Theme {
  return currentTheme;
}

/** Server snapshot: always "dark" (the default theme) so hydration matches. */
function getServerSnapshot(): Theme {
  return "dark";
}

function syncThemeClass(next: Theme): void {
  const root = document.documentElement;
  // The `:root` palette IS dark; light is an opt-in `.light` override.
  root.classList.toggle("light", next === "light");
  root.classList.remove("dark");
}

function applyTheme(next: Theme): void {
  currentTheme = next;
  syncThemeClass(next);
  window.localStorage.setItem(STORAGE_KEY, next);
  emitThemeChange();
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Keep the <html> class in sync whenever the theme changes. No setState
  // here: the store already holds the theme and notifies re-renders.
  useLayoutEffect(() => {
    syncThemeClass(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return { theme, toggleTheme };
}
