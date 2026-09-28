import { useMemo, useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import ApplicationDetailsModal from "../components/ApplicationDetailsModal";
import DeleteModal from "../components/DeleteModal";
import FilterBar from "../components/FilterBar";
import KanbanBoard from "../components/KanbanBoard";
import Statistics from "../components/Statistics";

import "./Dashboard.css";

const Dashboard = ({ applications, dispatch }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const visibleApplications = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const filteredApplications = applications.filter(
      (application) =>
        application.fullName.toLowerCase().includes(searchText) ||
        application.position.toLowerCase().includes(searchText) ||
        application.company.toLowerCase().includes(searchText),
    );

    return [...filteredApplications].sort((first, second) => {
      if (sortBy === "oldest") {
        return new Date(first.appliedDate) - new Date(second.appliedDate);
      }

      if (sortBy === "salary-high") {
        return second.salaryExpectation - first.salaryExpectation;
      }

      if (sortBy === "salary-low") {
        return first.salaryExpectation - second.salaryExpectation;
      }

      return new Date(second.appliedDate) - new Date(first.appliedDate);
    });
  }, [applications, search, sortBy]);

  const handleDelete = () => {
    dispatch({
      type: "DELETE_APPLICATION",
      payload: applicationToDelete.id,
    });

    setApplicationToDelete(null);
  };

  return (
    <div className="dashboard">
      <section className="dashboard-hero">
        <div>
          <div className="dashboard-hero__label">
            <Sparkles size={15} />
            CAREER PIPELINE
          </div>

          <h1>Organize your next big opportunity.</h1>

          <p>
            Follow every application from the first click to the final decision.
          </p>
        </div>

        <Link className="dashboard-hero__button" to="/add">
          <Plus size={19} />
          New Application
        </Link>
      </section>

      <Statistics applications={applications} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <KanbanBoard
        applications={visibleApplications}
        dispatch={dispatch}
        activeStatus={statusFilter}
        onView={setSelectedApplication}
        onDelete={setApplicationToDelete}
      />

      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}

      {applicationToDelete && (
        <DeleteModal
          application={applicationToDelete}
          onCancel={() => setApplicationToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
