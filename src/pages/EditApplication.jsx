import { ArrowLeft, Pencil } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import "./EditApplication.css";

const EditApplication = () => {
  const { id } = useParams();

  return (
    <section className="edit-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={17} />
        Back to Dashboard
      </Link>

      <div className="edit-card">
        <div className="edit-icon">
          <Pencil size={27} />
        </div>

        <p className="edit-label">UPDATE OPPORTUNITY</p>

        <h1 className="edit-title">Edit Application</h1>

        <span className="edit-description">Application ID: {id}</span>
      </div>
    </section>
  );
};

export default EditApplication;
