import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import ApplicationForm, {
  emptyApplication,
} from "../components/ApplicationForm";

import "./AddApplication.css";

const AddApplication = ({ dispatch }) => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const newApplication = {
      ...values,
      id: nanoid(),
      salaryExpectation: Number(values.salaryExpectation),
      experience: Number(values.experience),
      status: "pending",
      appliedDate: new Date().toISOString(),
    };

    dispatch({
      type: "ADD_APPLICATION",
      payload: newApplication,
    });

    navigate("/");
  };

  return (
    <section className="add-application">
      <header className="add-application__header">
        <p>NEW OPPORTUNITY</p>
        <h1>Add Application</h1>
        <span>Enter the information about your job application</span>
      </header>

      <ApplicationForm
        initialValues={emptyApplication}
        onSubmit={handleSubmit}
        submitText="Add Application"
      />
    </section>
  );
};

export default AddApplication;
