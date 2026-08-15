import type { Wish } from "../domain/wish";
import type { WishRepository } from "./repository";

/**
 * IndexedDB-backed {@link WishRepository}.
 *
 * Browser-only API: the database is only opened lazily inside an operation, so
 * instantiating this class during server rendering is safe (no IndexedDB call
 * happens until `open()` runs, which only happens in a browser context).
 */

const DB_NAME = "genshin-wish-tracker";
const STORE_NAME = "wishes";
const DB_VERSION = 1;

export class IndexedDbWishRepository implements WishRepository {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private open(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }
    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("bannerType", "bannerType", { unique: false });
          store.createIndex("timestamp", "timestamp", { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
    });
    return this.dbPromise;
  }

  async getAllWishes(): Promise<Wish[]> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve((request.result as Wish[]) ?? []);
      request.onerror = () => reject(request.error ?? new Error("read failed"));
    });
  }

  async getWishById(id: string): Promise<Wish | undefined> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).get(id);
      request.onsuccess = () => resolve(request.result as Wish | undefined);
      request.onerror = () => reject(request.error ?? new Error("read failed"));
    });
  }

  async addWishes(wishes: Wish[]): Promise<void> {
    if (wishes.length === 0) {
      return;
    }
    const db = await this.open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      for (const wish of wishes) {
        store.add(wish);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("add transaction failed"));
      tx.onabort = () => reject(tx.error ?? new Error("add transaction aborted"));
    });
  }

  async upsertWishes(wishes: Wish[]): Promise<void> {
    if (wishes.length === 0) {
      return;
    }
    const db = await this.open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      for (const wish of wishes) {
        store.put(wish);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("upsert transaction failed"));
      tx.onabort = () => reject(tx.error ?? new Error("upsert transaction aborted"));
    });
  }

  async deleteWish(id: string): Promise<void> {
    const db = await this.open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("delete failed"));
    });
  }

  async clearWishes(): Promise<void> {
    const db = await this.open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("clear failed"));
    });
  }

  async countWishes(): Promise<number> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("count failed"));
    });
  }
}

let singleton: WishRepository | null = null;

/**
 * Return a lazily-created repository instance. Instantiating it does not touch
 * IndexedDB, so it can be used safely in browser-only code paths.
 */
export function getWishRepository(): WishRepository {
  if (!singleton) {
    singleton = new IndexedDbWishRepository();
  }
  return singleton;
}
