import { useEffect } from "react";
import { Trash2, X } from "lucide-react";

import "./DeleteModal.css";

const DeleteModal = ({ application, onCancel, onConfirm }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onCancel]);

  return (
    <div className="delete-overlay" onClick={onCancel}>
      <article
        className="delete-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="delete-modal__close"
          type="button"
          onClick={onCancel}
        >
          <X size={20} />
        </button>

        <div className="delete-modal__icon">
          <Trash2 size={27} />
        </div>

        <h2>Delete application?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{application.position}</strong> at{" "}
          <strong>{application.company}</strong>?
        </p>

        <span>This action cannot be undone.</span>

        <div className="delete-modal__actions">
          <button
            className="delete-modal__cancel"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-modal__confirm"
            type="button"
            onClick={onConfirm}
          >
            <Trash2 size={17} />
            Delete
          </button>
        </div>
      </article>
    </div>
  );
};

export default DeleteModal;
