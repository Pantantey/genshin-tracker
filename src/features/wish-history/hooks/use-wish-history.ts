import { useCallback, useEffect, useState } from "react";
import type { Wish } from "../domain/wish";
import type { WishRepository } from "../services/repository";

export type HistoryStatus = "loading" | "ready" | "error";

export interface WishHistoryController {
  wishes: Wish[];
  status: HistoryStatus;
  loadError: string | null;
  refresh: () => Promise<void>;
  addImported: (wishes: Wish[]) => Promise<void>;
  clear: () => Promise<void>;
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
    async (newWishes: Wish[]) => {
      if (newWishes.length === 0) {
        return;
      }
      await repository.addWishes(newWishes);
      setWishes((previous) => {
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

  return { wishes, status, loadError, refresh, addImported, clear };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Failed to load wish history.";
}
