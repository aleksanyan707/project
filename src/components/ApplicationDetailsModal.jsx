import { useEffect } from "react";
import { Building2, ExternalLink, X } from "lucide-react";

import "./ApplicationDetailsModal.css";

const ApplicationDetailsModal = ({ application, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const formattedDate = new Date(application.appliedDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="details-overlay" onClick={onClose}>
      <article
        className="details-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="details-modal__header">
          <div className="details-modal__title">
            <div className="details-modal__icon">
              <Building2 size={24} />
            </div>

            <div>
              <h2>{application.position}</h2>
              <p>{application.company}</p>
            </div>
          </div>

          <button
            className="details-modal__close"
            type="button"
            onClick={onClose}
          >
            <X size={21} />
          </button>
        </header>

        <div className="details-modal__body">
          <span
            className={`details-modal__status details-modal__status--${application.status}`}
          >
            {application.status}
          </span>

          <div className="details-modal__grid">
            <div>
              <span>Applicant</span>
              <strong>{application.fullName}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{application.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{application.phone}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{application.location || "Not specified"}</strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>{application.experience} years</strong>
            </div>

            <div>
              <span>Expected salary</span>
              <strong>
                ${Number(application.salaryExpectation).toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Applied date</span>
              <strong>{formattedDate}</strong>
            </div>

            <div>
              <span>CV</span>

              <a href={application.cvUrl} target="_blank" rel="noreferrer">
                Open CV
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="details-modal__cover-letter">
            <span>Cover letter</span>
            <p>{application.coverLetter}</p>
          </div>
        </div>

        <footer className="details-modal__footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </article>
    </div>
  );
};

export default ApplicationDetailsModal;
