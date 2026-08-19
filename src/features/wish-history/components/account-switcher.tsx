"use client";

import { useState } from "react";
import Link from "next/link";
import type { AccountInfo } from "../hooks/use-wish-history";
import { useAccountNames } from "../hooks/use-account-names";
import { useLanguage } from "@/hooks/use-language";

/**
 * Account selector rendered inside the summary box (bottom section, visually
 * attached to the banner info). One pill per stored account: clicking one makes
 * the whole tracker (pity, 50/50, history, pull grid) show that account.
 *
 * Each pill shows only the uid (or its custom alias) plus a pencil icon to edit
 * the display name. The alias is purely visual and never affects the data.
 */
export interface AccountSwitcherProps {
  accounts: AccountInfo[];
  /** Uid of the currently shown account. */
  activeUid: string | null;
  onSelect: (uid: string) => void;
}

export function AccountSwitcher({
  accounts,
  activeUid,
  onSelect,
}: AccountSwitcherProps) {
  const { t } = useLanguage();
  const { getAlias, setAlias } = useAccountNames();
  const [editingUid, setEditingUid] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  if (accounts.length === 0) {
    return null;
  }

  function startEdit(uid: string) {
    setDraft(getAlias(uid) ?? "");
    setEditingUid(uid);
  }

  function saveEdit(uid: string) {
    setAlias(uid, draft);
    setEditingUid(null);
  }

  function cancelEdit() {
    setEditingUid(null);
  }

  return (
    <div
      role="group"
      aria-label={t("account.selectLabel")}
      className="flex flex-wrap items-center gap-2 border-t border-borders px-4 py-3"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-text-black">
        {t("account.selectLabel")}
      </span>
      {accounts.map((account) => {
        const active = account.uid === activeUid;
        const alias = getAlias(account.uid);
        const isEditing = editingUid === account.uid;
        return (
          <div
            key={account.uid}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
              active
                ? "bg-bg-button text-text-white"
                : "hover:bg-borders"
            }`}
          >
            {isEditing ? (
              <input
                autoFocus
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    saveEdit(account.uid);
                  } else if (event.key === "Escape") {
                    cancelEdit();
                  }
                }}
                onBlur={() => saveEdit(account.uid)}
                placeholder={account.uid}
                aria-label={t("account.nameInput")}
                className="w-32 rounded border border-placeholder bg-bg-cards px-1.5 py-0.5 text-sm text-text-black outline-none placeholder:text-placeholder"
              />
            ) : (
              <>
                <button
                  type="button"
                  aria-pressed={active}
                  title={account.uid}
                  onClick={() => onSelect(account.uid)}
                  className={`flex flex-col items-start justify-center transition-colors ${
                    active
                      ? "text-text-white hover:text-text-white"
                      : "text-text-black hover:text-text-black"
                  }`}
                >
                  <span className="max-w-[10rem] truncate text-sm font-medium tabular-nums leading-tight">
                    {alias !== null ? alias : `${t("summary.uid")}: ${account.uid}`}
                  </span>
                  {alias !== null && (
                    <span
                      className={`max-w-[10rem] truncate text-[11px] tabular-nums leading-tight ${
                        active ? "text-text-white/80" : "text-text-black/70"
                      }`}
                    >
                      {t("summary.uid")}: {account.uid}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  aria-label={t("account.editName")}
                  title={t("account.editName")}
                  onClick={() => startEdit(account.uid)}
                  className={`shrink-0 rounded p-0.5 transition-colors ${
                    active
                      ? "text-text-white/80 hover:text-text-white"
                      : "text-text-black hover:text-text-black"
                  }`}
                >
                  <PencilIcon />
                </button>
              </>
            )}
          </div>
        );
      })}

      <Link
        href="/import"
        className="ml-auto shrink-0 rounded-md border border-borders bg-tab-inactive-bg px-3 py-1.5 text-sm font-medium text-text-black transition-colors hover:bg-borders"
      >
        {t("account.addOrUpdate")}
      </Link>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

