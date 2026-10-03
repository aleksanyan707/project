import { useEffect, useRef } from "react";
import { useField } from "formik";

import "./FormStatusDropdown.css";

const options = [
  { value: "pending", label: "Pending", icon: "🟡" },
  { value: "interview", label: "Interview", icon: "🔵" },
  { value: "accepted", label: "Accepted", icon: "🟢" },
  { value: "rejected", label: "Rejected", icon: "🔴" },
];

const FormStatusDropdown = ({ name = "status", disabled = false }) => {
  const [field, meta, helpers] = useField(name);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const selected =
    options.find((option) => option.value === field.value) || options[0];

  useEffect(() => {
    const closeOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        dropdownRef.current?.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", closeOutside);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      dropdownRef.current?.removeAttribute("open");
    }
  }, [disabled]);

  const selectStatus = (value) => {
    helpers.setValue(value);
    helpers.setTouched(true, false);
    dropdownRef.current.removeAttribute("open");
    triggerRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dropdownRef.current.removeAttribute("open");
      triggerRef.current.focus();
    }
  };

  return (
    <div className="form-field">
      <label id={`${name}-label`}>Status *</label>

      <details
        ref={dropdownRef}
        className="form-status-dropdown"
        onKeyDown={handleKeyDown}
      >
        <summary
          ref={triggerRef}
          aria-labelledby={`${name}-label ${name}-value`}
          aria-disabled={disabled}
          aria-invalid={Boolean(meta.touched && meta.error)}
          aria-describedby={
            meta.touched && meta.error ? `${name}-error` : undefined
          }
          className={`form-status-trigger ${selected.value}`}
          onClick={(event) => {
            if (disabled) event.preventDefault();
          }}
        >
          <span id={`${name}-value`}>
            <span aria-hidden="true">{selected.icon}</span> {selected.label}
          </span>

          <span className="form-status-arrow" aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className="form-status-options">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              className={`form-status-option ${
                selected.value === option.value ? "selected" : ""
              }`}
              aria-pressed={selected.value === option.value}
              onClick={() => selectStatus(option.value)}
            >
              <span aria-hidden="true">{option.icon}</span>
              <span>{option.label}</span>

              {selected.value === option.value && (
                <span className="form-status-check" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </details>

      {meta.touched && meta.error && (
        <small id={`${name}-error`} className="form-error" role="alert">
          {meta.error}
        </small>
      )}
    </div>
  );
};

export default FormStatusDropdown;
