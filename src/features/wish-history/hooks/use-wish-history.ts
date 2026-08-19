import { useCallback, useEffect, useMemo, useState } from "react";
import type { Wish } from "../domain/wish";
import type { WishRepository } from "../services/repository";

/** localStorage key storing the timestamp of the last successful import. */
const LAST_IMPORT_KEY = "gwt-last-import";

/** localStorage key remembering the currently active account. */
const ACTIVE_UID_KEY = "gwt-active-uid";

/** Read the stored last-import timestamp (ISO string), or null. */
function readLastImport(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(LAST_IMPORT_KEY);
  } catch {
    return null;
  }
}

/** Persist the current time as the last-import timestamp and return it. */
function writeLastImport(): string {
  const now = new Date().toISOString();
  try {
    window.localStorage.setItem(LAST_IMPORT_KEY, now);
  } catch {
    // Best-effort persistence (e.g. blocked storage); the live value stays.
  }
  return now;
}

/** Read the stored active uid (if any). */
function readStoredActiveUid(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(ACTIVE_UID_KEY);
  } catch {
    return null;
  }
}

/** Persist the active uid selection (removing it when cleared). */
function writeActiveUid(uid: string | null): void {
  try {
    if (uid === null) {
      window.localStorage.removeItem(ACTIVE_UID_KEY);
    } else {
      window.localStorage.setItem(ACTIVE_UID_KEY, uid);
    }
  } catch {
    // Best-effort persistence; the live value stays.
  }
}

export type HistoryStatus = "loading" | "ready" | "error";

/** A stored account, derived from the unique uids present in the history. */
export interface AccountInfo {
  uid: string;
  /** Number of wishes stored for this account. */
  total: number;
}

/** How an import is merged into the stored history. */
export type ImportMode = "append" | "replace";

export interface WishHistoryController {
  wishes: Wish[];
  /** All accounts currently stored (derived from the wishes). */
  accounts: AccountInfo[];
  /** Uid of the account currently shown, or null when no data exists. */
  activeUid: string | null;
  switchAccount: (uid: string) => void;
  status: HistoryStatus;
  loadError: string | null;
  /** ISO timestamp of the last successful import, or null. */
  lastUpdated: string | null;
  refresh: () => Promise<void>;
  addImported: (wishes: Wish[], mode?: ImportMode) => Promise<void>;
  clear: () => Promise<void>;
}

/**
 * Derive the stored accounts from the canonical wishes: one entry per unique
 * uid, ordered numerically, with a total wish count. Accounts are never
 * persisted separately — they always mirror the wish collection.
 */
export function deriveAccounts(wishes: Wish[]): AccountInfo[] {
  const totals = new Map<string, number>();
  for (const wish of wishes) {
    if (!wish.uid) {
      continue;
    }
    totals.set(wish.uid, (totals.get(wish.uid) ?? 0) + 1);
  }
  return [...totals.entries()]
    .map(([uid, total]) => ({ uid, total }))
    .sort((a, b) => a.uid.localeCompare(b.uid, undefined, { numeric: true }));
}

/**
 * Loads canonical wishes from the repository once and exposes in-memory state
 * for the UI. IndexedDB data is never available synchronously, so callers must
 * handle the `loading` state.
 */
export function useWishHistory(repository: WishRepository): WishHistoryController {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<HistoryStatus>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(
    () => readLastImport()
  );
  // Selected account (persisted in localStorage). The value actually shown is
  // DERIVED below so it always points at an existing account: when the stored
  // uid no longer exists (or nothing is stored), it falls back to the first
  // account. Derived, not an effect, so no render cascade is needed.
  const [activeUid, setActiveUid] = useState<string | null>(() =>
    readStoredActiveUid()
  );

  const accounts = useMemo(() => deriveAccounts(wishes), [wishes]);

  const effectiveActiveUid = useMemo(() => {
    if (accounts.length === 0) {
      return null;
    }
    if (activeUid && accounts.some((a) => a.uid === activeUid)) {
      return activeUid;
    }
    return accounts[0].uid;
  }, [accounts, activeUid]);

  const switchAccount = useCallback((uid: string) => {
    writeActiveUid(uid);
    setActiveUid(uid);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const stored = await repository.getAllWishes();
      setWishes(stored);
      setStatus("ready");
      setLoadError(null);
    } catch (error) {
      setStatus("error");
      setLoadError(errorMessage(error));
    }
  }, [repository]);

  useEffect(() => {
    let cancelled = false;
    repository
      .getAllWishes()
      .then((stored) => {
        if (cancelled) {
          return;
        }
        setWishes(stored);
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }
        setStatus("error");
        setLoadError(errorMessage(error));
      });
    return () => {
      cancelled = true;
    };
  }, [repository]);

  const addImported = useCallback(
    async (newWishes: Wish[], mode: ImportMode = "append") => {
      if (newWishes.length === 0) {
        return;
      }
      if (mode === "replace") {
        const uid = newWishes[0].uid;
        if (uid) {
          await repository.deleteByUid(uid);
        }
      }
      await repository.addWishes(newWishes);
      setLastUpdated(writeLastImport());
      setWishes((previous) => {
        if (mode === "replace") {
          const uid = newWishes[0].uid;
          const kept = uid ? previous.filter((w) => w.uid !== uid) : previous;
          const known = new Set(kept.map((w) => w.id));
          return kept.concat(newWishes.filter((w) => !known.has(w.id)));
        }
        const known = new Set(previous.map((w) => w.id));
        return previous.concat(newWishes.filter((w) => !known.has(w.id)));
      });
    },
    [repository]
  );

  const clear = useCallback(async () => {
    await repository.clearWishes();
    setWishes([]);
  }, [repository]);

  return {
    wishes,
    accounts,
    activeUid: effectiveActiveUid,
    switchAccount,
    status,
    loadError,
    lastUpdated,
    refresh,
    addImported,
    clear,
  };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Failed to load wish history.";
}
