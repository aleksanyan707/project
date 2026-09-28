import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ApplicationForm from "../components/ApplicationForm";
import "./EditApplication.css";

const EditApplication = ({ applications, dispatch }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const application = applications.find((item) => item.id === id);

  if (!application) {
    return (
      <section className="edit-application__not-found">
        <h1>Application not found</h1>

        <p>This application may have been deleted or does not exist.</p>

        <Link to="/">
          <ArrowLeft size={18} />
          Return to Dashboard
        </Link>
      </section>
    );
  }

  const handleSubmit = (values) => {
    const updatedApplication = {
      ...application,
      ...values,
      salaryExpectation: Number(values.salaryExpectation),
      experience: Number(values.experience),
    };

    dispatch({
      type: "UPDATE_APPLICATION",
      payload: updatedApplication,
    });

    navigate("/");
  };

  return (
    <section className="edit-application">
      <Link className="edit-application__back" to="/">
        <ArrowLeft size={17} />
        Back to Dashboard
      </Link>

      <header className="edit-application__header">
        <p>UPDATE OPPORTUNITY</p>
        <h1>Edit Application</h1>

        <span>
          Update the information for {application.position} at{" "}
          {application.company}.
        </span>
      </header>

      <ApplicationForm
        initialValues={application}
        onSubmit={handleSubmit}
        submitText="Update Application"
      />
    </section>
  );
};

export default EditApplication;
