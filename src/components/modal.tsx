import { useEffect, type ReactNode } from "react";

export interface ModalProps {
  /** Whether the modal is currently open. */
  open: boolean;
  /** Heading text, also used as the dialog's accessible title. */
  title: string;
  /** Close handler (overlay click / close button / Escape). */
  onClose: () => void;
  /** Content rendered inside the dialog. */
  children: ReactNode;
}

/**
 * Reusable modal dialog. Follows the existing overlay pattern used by the
 * account dialog: a fixed backdrop plus a centered card. Pressing Escape or
 * clicking the backdrop closes it.
 */
export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="relative w-full max-w-md rounded-lg border border-borders bg-bg-cards p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-lg font-semibold text-text-black">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-md px-2 py-0.5 text-xl leading-none text-text-black transition-colors hover:bg-borders hover:text-text-black"
          >
            &times;
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}