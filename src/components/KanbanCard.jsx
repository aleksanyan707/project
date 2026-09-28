import {
  Building2,
  CalendarDays,
  Eye,
  MapPin,
  Pencil,
  Trash2,
  Wallet,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./KanbanCard.css";

const KanbanCard = ({ application, dispatch, onView, onDelete }) => {
  const {
    id,
    fullName,
    position,
    company,
    location,
    salaryExpectation,
    appliedDate,
    status,
  } = application;

  const formattedDate = new Date(appliedDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleStatusChange = (event) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        id,
        status: event.target.value,
      },
    });
  };

  return (
    <article className="kanban-card">
      <div className="kanban-card__company">
        <div className="kanban-card__icon">
          <Building2 size={18} />
        </div>

        <div>
          <span>{company}</span>
          <small>{fullName}</small>
        </div>
      </div>

      <h3>{position}</h3>

      <div className="kanban-card__details">
        <span>
          <MapPin size={14} />
          {location || "Remote"}
        </span>

        <span>
          <Wallet size={14} />${Number(salaryExpectation).toLocaleString()}
        </span>

        <span>
          <CalendarDays size={14} />
          {formattedDate}
        </span>
      </div>

      <div className="kanban-card__footer">
        <select value={status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          className="kanban-card__action"
          type="button"
          onClick={() => onView(application)}
          aria-label="View application"
        >
          <Eye size={16} />
        </button>

        <Link
          className="kanban-card__action"
          to={`/edit/${id}`}
          aria-label="Edit application"
        >
          <Pencil size={16} />
        </Link>

        <button
          className="kanban-card__action kanban-card__action--delete"
          type="button"
          onClick={() => onDelete(application)}
          aria-label="Delete application"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
};

export default KanbanCard;
