import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <NavLink className="brand-link" to="/">
          <div className="brand-text">
            <h2>NextStep</h2>
            <span>Application workspace</span>
          </div>
        </NavLink>

        <nav className="main-navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Add Application
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
