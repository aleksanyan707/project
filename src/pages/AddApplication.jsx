import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import { createApplication } from "../store/applicationActions";

import "./AddApplication.css";

const AddApplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { saving, error } = useSelector((state) => state.applications);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(createApplication(formData));

      navigate("/");
    } catch (error) {
      console.error("Application was not created:", error);
    }
  };

  return (
    <section className="add-page">
      <div className="add-heading">
        <p className="page-label">New opportunity</p>

        <h1>Add application</h1>

        <p>Add information about the position and track your progress.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <ApplicationForm onSubmit={handleSubmit} loading={saving} />
    </section>
  );
};

export default AddApplication;
