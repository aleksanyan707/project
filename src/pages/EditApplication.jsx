import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import ApplicationForm, {
  emptyApplication,
} from "../components/ApplicationForm/ApplicationForm";

import { updateApplication } from "../store/applicationActions";

import "./EditApplication.css";

const EditApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadApplication = async () => {
      setLoading(true);
      setLoadError("");
      setSaveError("");
      setApplication(null);

      try {
        const response = await axios.get(
          `http://localhost:3007/applications/${encodeURIComponent(id)}`,
          { signal: controller.signal },
        );

        if (!controller.signal.aborted) {
          setApplication(response.data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error.response?.status === 404
              ? "Application not found"
              : "Failed to load application. Check the server.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadApplication();

    return () => controller.abort();
  }, [id, retry]);

  const handleSubmit = async (values) => {
    setSaving(true);
    setSaveError("");

    try {
      await dispatch(updateApplication(id, values));
      navigate("/");
    } catch (error) {
      setSaveError(error.message || "Failed to update application");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="edit-page">
      <Link className="back-link" to="/">
        Back to Dashboard
      </Link>

      <div className="edit-card">
        <p className="edit-label">UPDATE OPPORTUNITY</p>

        <h1 className="edit-title">Edit Application</h1>

        <p className="edit-description">
          Update your application details and status.
        </p>
      </div>

      {loading ? (
        <p role="status">Loading application...</p>
      ) : loadError ? (
        <div role="alert">
          <p className="form-error">{loadError}</p>

          <button type="button" onClick={() => setRetry((value) => value + 1)}>
            Try again
          </button>
        </div>
      ) : (
        application && (
          <>
            {saveError && (
              <p className="form-error" role="alert">
                {saveError}
              </p>
            )}

            <ApplicationForm
              initialValues={{
                ...emptyApplication,
                ...application,
                status: application.status?.toLowerCase() || "pending",
              }}
              onSubmit={handleSubmit}
              onCancel={() => navigate("/")}
              submitText="Save changes"
              saving={saving}
            />
          </>
        )
      )}
    </section>
  );
};

export default EditApplication;
