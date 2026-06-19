import React, { useEffect } from "react";

const ConfirmModal = ({
  open,
  title = "Are you sure?",
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={onCancel}
    >
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div
          className={`confirm-modal-icon ${
            variant === "danger" ? "confirm-modal-icon-danger" : "confirm-modal-icon-default"
          }`}
        >
          {variant === "danger" ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
              <path
                d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
              <path
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <h2 id="confirm-title" className="confirm-modal-title">
          {title}
        </h2>
        {message && <p className="confirm-modal-message">{message}</p>}

        <div className="confirm-modal-actions">
          <button type="button" onClick={onCancel} className="btn-store-outline flex-1 sm:flex-none">
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={variant === "danger" ? "confirm-btn-danger flex-1 sm:flex-none" : "btn-store-primary flex-1 sm:flex-none"}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
