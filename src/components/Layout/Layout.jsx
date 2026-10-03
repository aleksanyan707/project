import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

import "./Layout.css";

const Layout = () => {
  return (
    <div className="app-layout">
      <Header />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
