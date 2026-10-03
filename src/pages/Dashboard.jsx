import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DeleteModal from "../components/DeleteModal/DeleteModal";
import StatusDropdown from "../components/StatusDropdown/StatusDropdown";

import {
  fetchApplications,
  deleteApplication,
  setApplicationSearch,
} from "../store/applicationActions";

import "./Dashboard.css";

const getStatus = (application) => {
  return application.status?.toLowerCase() || "pending";
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
    search = "",
    statusFilter = "all",
  } = useSelector((state) => state.applications);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const applications = Array.isArray(items) ? items : [];

  const filteredApplications = applications.filter((application) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      `${application.position || ""} ${application.company || ""}`
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      statusFilter === "all" || getStatus(application) === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statistics = [
    {
      label: "Total",
      status: "total",
      count: applications.length,
    },
    ...["pending", "interview", "accepted", "rejected"].map((status) => ({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      status,
      count: applications.filter(
        (application) => getStatus(application) === status,
      ).length,
    })),
  ];

  const openDeleteModal = (application) => {
    setDeleteError("");
    setSelectedApplication(application);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setSelectedApplication(null);
    setDeleteError("");
  };

  const handleDelete = async () => {
    if (!selectedApplication || deleting) return;

    setDeleting(true);
    setDeleteError("");

    try {
      await dispatch(deleteApplication(selectedApplication.id));
      setSelectedApplication(null);
    } catch (error) {
      setDeleteError(error.message || "Failed to delete application");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-message" role="status">
          <div className="loading-circle" aria-hidden="true" />
          <p>Loading applications...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-message error" role="alert">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <button type="button" onClick={() => dispatch(fetchApplications())}>
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="page-label">Application manager</p>
          <h1>Dashboard</h1>

          <p className="dashboard-description">
            Track your applications and manage your career opportunities in one
            place.
          </p>
        </div>

        <Link to="/add" className="add-button">
          Add application
        </Link>
      </section>

      <section className="statistics-grid">
        {statistics.map(({ label, status, count }) => (
          <article className={`statistic-card ${status}`} key={status}>
            <div>
              <span>{label}</span>
              <strong>{count}</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="applications-section">
        <div className="section-heading">
          <div>
            <p className="page-label">Your progress</p>
            <h2>Applications</h2>
          </div>

          <span className="application-count">{applications.length} total</span>
        </div>

        <div className="application-filters">
          <input
            type="search"
            aria-label="Search applications"
            placeholder="Search by position or company..."
            value={search}
            onChange={(event) =>
              dispatch(setApplicationSearch(event.target.value))
            }
          />

          <StatusDropdown />
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications yet</h3>

            <p>
              Add your first job application to start tracking your progress.
            </p>

            <Link to="/add" className="empty-button">
              Add first application
            </Link>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="empty-state" role="status">
            <p>No applications match your search.</p>
          </div>
        ) : (
          <div className="applications-list">
            {filteredApplications.map((application) => {
              const status = getStatus(application);

              return (
                <article className="application-card" key={application.id}>
                  <div className="application-information">
                    <div className="application-title">
                      <div>
                        <h3>{application.position || "Unknown position"}</h3>

                        <p>{application.company || "Unknown company"}</p>
                      </div>
                    </div>

                    <div className="application-details">
                      {application.location && (
                        <span>{application.location}</span>
                      )}

                      {application.appliedDate && (
                        <span>{application.appliedDate}</span>
                      )}

                      {application.salaryExpectation && (
                        <span>
                          Expected salary: ${application.salaryExpectation}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="application-actions">
                    <span className={`status-badge ${status}`}>{status}</span>

                    <Link
                      to={`/edit/${application.id}`}
                      className="edit-button"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => openDeleteModal(application)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {selectedApplication && (
        <DeleteModal
          application={selectedApplication}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          deleting={deleting}
          error={deleteError}
        />
      )}
    </section>
  );
};

export default Dashboard;
