import type { Wish } from "../domain/wish";

/**
 * Persistence abstraction for wish history.
 *
 * UI components and the rest of the application must not touch IndexedDB (or
 * any other storage) directly — they depend on this interface. The concrete
 * implementation is provided by the {@link IndexedDbWishRepository}.
 */
export interface WishRepository {
  getAllWishes(): Promise<Wish[]>;
  getWishById(id: string): Promise<Wish | undefined>;
  /** Insert wishes that do not already exist (idempotent by `id`). */
  addWishes(wishes: Wish[]): Promise<void>;
  /** Insert or overwrite wishes by `id`. */
  upsertWishes(wishes: Wish[]): Promise<void>;
  deleteWish(id: string): Promise<void>;
  /** Delete every wish belonging to one account (uid). Used when replacing a stored history. */
  deleteByUid(uid: string): Promise<void>;
  clearWishes(): Promise<void>;
  countWishes(): Promise<number>;
}
