import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setApplicationFilter } from "../../store/applicationActions";

import "./StatusDropdown.css";

const options = [
  { value: "all", label: "All statuses", icon: "◎" },
  { value: "pending", label: "Pending", icon: "🟡" },
  { value: "interview", label: "Interview", icon: "🔵" },
  { value: "accepted", label: "Accepted", icon: "🟢" },
  { value: "rejected", label: "Rejected", icon: "🔴" },
];

const StatusDropdown = () => {
  const dispatch = useDispatch();

  const statusFilter = useSelector(
    (state) => state.applications.statusFilter || "all",
  );

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const selected =
    options.find((option) => option.value === statusFilter) || options[0];

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

  const selectStatus = (value) => {
    dispatch(setApplicationFilter(value));
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
    <details
      ref={dropdownRef}
      className="status-dropdown"
      onKeyDown={handleKeyDown}
    >
      <summary ref={triggerRef} className={`status-trigger ${selected.value}`}>
        <span>
          <span aria-hidden="true">{selected.icon}</span> {selected.label}
        </span>

        <span className="dropdown-arrow" aria-hidden="true">
          ▾
        </span>
      </summary>

      <div className="status-options">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`status-option ${
              selected.value === option.value ? "selected" : ""
            }`}
            aria-pressed={selected.value === option.value}
            onClick={() => selectStatus(option.value)}
          >
            <span aria-hidden="true">{option.icon}</span>
            <span>{option.label}</span>

            {selected.value === option.value && (
              <span className="option-check" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </details>
  );
};

export default StatusDropdown;
