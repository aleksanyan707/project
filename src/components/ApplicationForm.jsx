import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";

import "./ApplicationForm.css";

export const emptyApplication = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  company: "",
  salaryExpectation: "",
  experience: "",
  location: "",
  cvUrl: "",
  coverLetter: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().trim().required("Full name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: Yup.string().trim().required("Phone number is required"),

  position: Yup.string().trim().required("Position is required"),

  company: Yup.string().trim().required("Company is required"),

  salaryExpectation: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be greater than 0")
    .required("Salary is required"),

  experience: Yup.number()
    .typeError("Experience must be a number")
    .min(0, "Experience cannot be negative")
    .required("Experience is required"),

  location: Yup.string().trim(),

  cvUrl: Yup.string()
    .trim()
    .url("Enter a valid URL")
    .required("CV URL is required"),

  coverLetter: Yup.string()
    .trim()
    .min(50, "Cover letter must contain at least 50 characters")
    .max(500, "Maximum 500 characters")
    .required("Cover letter is required"),
});

const ApplicationForm = ({
  initialValues = emptyApplication,
  onSubmit,
  submitText = "Save Application",
}) => {
  const fullNameRef = useRef(null);

  useEffect(() => {
    fullNameRef.current?.focus();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className="application-form">
          <div className="application-form__grid">
            <div className="form-field">
              <label htmlFor="fullName">Full Name *</label>

              <Field
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                innerRef={fullNameRef}
              />

              <ErrorMessage
                name="fullName"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email *</label>

              <Field
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
              />

              <ErrorMessage
                name="email"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone *</label>

              <Field id="phone" name="phone" placeholder="+374 99 123456" />

              <ErrorMessage
                name="phone"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="position">Position *</label>

              <Field
                id="position"
                name="position"
                placeholder="Frontend Developer"
              />

              <ErrorMessage
                name="position"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="company">Company *</label>

              <Field id="company" name="company" placeholder="Company name" />

              <ErrorMessage
                name="company"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="location">Location</label>

              <Field
                id="location"
                name="location"
                placeholder="Yerevan, Remote"
              />

              <ErrorMessage
                name="location"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="salaryExpectation">Salary Expectation *</label>

              <Field
                id="salaryExpectation"
                name="salaryExpectation"
                type="number"
                min="1"
                placeholder="1500"
              />

              <ErrorMessage
                name="salaryExpectation"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="experience">Experience (years) *</label>

              <Field
                id="experience"
                name="experience"
                type="number"
                min="0"
                placeholder="1"
              />

              <ErrorMessage
                name="experience"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field application-form__full-width">
              <label htmlFor="cvUrl">CV URL *</label>

              <Field
                id="cvUrl"
                name="cvUrl"
                type="url"
                placeholder="https://example.com/cv.pdf"
              />

              <ErrorMessage
                name="cvUrl"
                component="small"
                className="form-field__error"
              />
            </div>

            <div className="form-field application-form__full-width">
              <div className="form-field__heading">
                <label htmlFor="coverLetter">Cover Letter *</label>

                <span>{values.coverLetter.length}/500</span>
              </div>

              <Field
                as="textarea"
                id="coverLetter"
                name="coverLetter"
                rows="7"
                maxLength="500"
                placeholder="Tell us about yourself..."
              />

              <ErrorMessage
                name="coverLetter"
                component="small"
                className="form-field__error"
              />
            </div>
          </div>

          <button
            className="application-form__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : submitText}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ApplicationForm;
