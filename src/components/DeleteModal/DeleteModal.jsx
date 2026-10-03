import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./DeleteModal.css";

const DeleteModal = ({ application, onClose, onConfirm, deleting, error }) => {
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    dialog.showModal();
    cancelRef.current?.focus();

    return () => dialog.close();
  }, []);

  const handleCancel = (event) => {
    event.preventDefault();

    if (!deleting) onClose();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="delete-modal"
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
      aria-busy={deleting}
      onCancel={handleCancel}
    >
      <h2 id="delete-title">Delete application?</h2>

      <p id="delete-description">
        Delete the application for{" "}
        <strong>{application.position || "this position"}</strong>
        {application.company && <> at {application.company}</>}? This action
        cannot be undone.
      </p>

      {error && (
        <p className="modal-error" role="alert">
          {error}
        </p>
      )}

      <div className="modal-actions">
        <button
          ref={cancelRef}
          type="button"
          className="modal-cancel"
          onClick={onClose}
          disabled={deleting}
        >
          Cancel
        </button>

        <button
          type="button"
          className="modal-delete"
          onClick={onConfirm}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </dialog>,
    document.body,
  );
};

export default DeleteModal;
