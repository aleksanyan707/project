import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  BriefcaseBusiness,
  Clock3,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  Plus,
} from "lucide-react";

import { fetchApplications } from "../store/applicationActions";

import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    items = [],
    loading,
    error,
  } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const applications = Array.isArray(items) ? items : [];

  const pendingCount = applications.filter(
    (application) => application.status?.toLowerCase() === "pending",
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status?.toLowerCase() === "interview",
  ).length;

  const acceptedCount = applications.filter(
    (application) => application.status?.toLowerCase() === "accepted",
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status?.toLowerCase() === "rejected",
  ).length;

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-message">
          <div className="loading-circle"></div>
          <p>Loading applications...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-message error">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <button type="button" onClick={() => dispatch(fetchApplications())}>
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
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
          <Plus size={19} />
          Add application
        </Link>
      </section>

      <section className="statistics-grid">
        <article className="statistic-card total">
          <div className="statistic-icon">
            <BriefcaseBusiness size={23} />
          </div>

          <div>
            <span>Total</span>
            <strong>{applications.length}</strong>
          </div>
        </article>

        <article className="statistic-card pending">
          <div className="statistic-icon">
            <Clock3 size={23} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </article>

        <article className="statistic-card interview">
          <div className="statistic-icon">
            <CalendarDays size={23} />
          </div>

          <div>
            <span>Interview</span>
            <strong>{interviewCount}</strong>
          </div>
        </article>

        <article className="statistic-card accepted">
          <div className="statistic-icon">
            <CheckCircle2 size={23} />
          </div>

          <div>
            <span>Accepted</span>
            <strong>{acceptedCount}</strong>
          </div>
        </article>

        <article className="statistic-card rejected">
          <div className="statistic-icon">
            <XCircle size={23} />
          </div>

          <div>
            <span>Rejected</span>
            <strong>{rejectedCount}</strong>
          </div>
        </article>
      </section>

      <section className="applications-section">
        <div className="section-heading">
          <div>
            <p className="page-label">Your progress</p>
            <h2>Applications</h2>
          </div>

          <span className="application-count">{applications.length} total</span>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <BriefcaseBusiness size={30} />
            </div>

            <h3>No applications yet</h3>

            <p>
              Add your first job application to start tracking your progress.
            </p>

            <Link to="/add" className="empty-button">
              <Plus size={18} />
              Add first application
            </Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((application) => {
              const status = application.status?.toLowerCase() || "pending";

              return (
                <article className="application-card" key={application.id}>
                  <div className="company-icon">
                    <Building2 size={25} />
                  </div>

                  <div className="application-information">
                    <div className="application-title">
                      <div>
                        <h3>{application.position || "Unknown position"}</h3>

                        <p>{application.company || "Unknown company"}</p>
                      </div>

                      <span className={`status-badge ${status}`}>{status}</span>
                    </div>

                    <div className="application-details">
                      {application.location && (
                        <span>
                          <MapPin size={16} />
                          {application.location}
                        </span>
                      )}

                      {application.appliedDate && (
                        <span>
                          <CalendarDays size={16} />
                          {application.appliedDate}
                        </span>
                      )}

                      {application.salaryExpectation && (
                        <span>
                          Expected salary: ${application.salaryExpectation}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="application-actions">
                    <Link
                      to={`/edit/${application.id}`}
                      className="edit-button"
                    >
                      Edit
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
