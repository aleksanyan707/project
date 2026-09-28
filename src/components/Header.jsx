import { BriefcaseBusiness, LayoutDashboard, Plus } from "lucide-react";

import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="main-header__container">
        <NavLink className="main-header__brand" to="/">
          <div className="main-header__logo">
            <BriefcaseBusiness size={23} />
          </div>

          <div>
            <h2>NextStep</h2>
            <span>Job application workspace</span>
          </div>
        </NavLink>

        <nav className="main-header__navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `main-header__link ${isActive ? "main-header__link--active" : ""}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `main-header__link ${isActive ? "main-header__link--active" : ""}`
            }
          >
            <Plus size={18} />
            New Application
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
