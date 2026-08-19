"use client";

import { useCallback, useState } from "react";

/**
 * User-chosen display names for accounts (uid → alias).
 *
 * Purely cosmetic: aliases are stored in localStorage, never touch the wish
 * data and never affect calculations (pity, 50/50, history still key by uid).
 */
const ACCOUNT_NAMES_KEY = "gwt-account-names";

function readAccountNames(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(ACCOUNT_NAMES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function writeAccountNames(names: Record<string, string>): void {
  try {
    window.localStorage.setItem(ACCOUNT_NAMES_KEY, JSON.stringify(names));
  } catch {
    // Best-effort persistence (e.g. blocked storage); the live value stays.
  }
}

export interface AccountNamesController {
  /** Alias for a uid, or null when the account has no custom name. */
  getAlias: (uid: string) => string | null;
  /** Set (or clear, when empty) the display alias for an account. */
  setAlias: (uid: string, name: string) => void;
}

export function useAccountNames(): AccountNamesController {
  const [names, setNames] = useState<Record<string, string>>(() =>
    readAccountNames()
  );

  const getAlias = useCallback(
    (uid: string) => names[uid] ?? null,
    [names]
  );

  const setAlias = useCallback((uid: string, name: string) => {
    const trimmed = name.trim();
    setNames((previous) => {
      const next: Record<string, string> = { ...previous };
      if (trimmed) {
        next[uid] = trimmed;
      } else {
        delete next[uid];
      }
      writeAccountNames(next);
      return next;
    });
  }, []);

  return { getAlias, setAlias };
}
