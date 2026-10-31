import "./ConfirmDialog.css";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean; // true makes the confirm button red
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Draw nothing while the dialog is closed.
  if (!open) {
    return null;
  }

  return (
    <div className="confirm-overlay" role="presentation" onClick={onCancel}>
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        // Stop clicks inside the box from closing it.
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-title" className="confirm-title">
          {title}
        </h2>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button type="button" className="confirm-cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={destructive ? "confirm-ok confirm-ok-danger" : "confirm-ok"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}