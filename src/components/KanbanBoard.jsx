import KanbanCard from "./KanbanCard";
import "./KanbanBoard.css";

const columns = [
  {
    status: "pending",
    title: "Pending",
  },
  {
    status: "interview",
    title: "Interview",
  },
  {
    status: "accepted",
    title: "Accepted",
  },
  {
    status: "rejected",
    title: "Rejected",
  },
];

const KanbanBoard = ({
  applications,
  dispatch,
  activeStatus,
  onView,
  onDelete,
}) => {
  const visibleColumns =
    activeStatus === "all"
      ? columns
      : columns.filter((column) => column.status === activeStatus);

  return (
    <section
      className={`kanban-board ${
        visibleColumns.length === 1 ? "kanban-board--single" : ""
      }`}
    >
      {visibleColumns.map((column) => {
        const columnApplications = applications.filter(
          (application) => application.status === column.status,
        );

        return (
          <div
            className={`kanban-column kanban-column--${column.status}`}
            key={column.status}
          >
            <header className="kanban-column__header">
              <div>
                <span className="kanban-column__dot" />
                <h2>{column.title}</h2>
              </div>

              <strong>{columnApplications.length}</strong>
            </header>

            <div className="kanban-column__content">
              {columnApplications.length ? (
                columnApplications.map((application) => (
                  <KanbanCard
                    key={application.id}
                    application={application}
                    dispatch={dispatch}
                    onView={onView}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <div className="kanban-column__empty">No applications</div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default KanbanBoard;
