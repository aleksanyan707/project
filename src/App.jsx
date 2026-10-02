import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import { AddApplication, Dashboard, EditApplication } from "./pages";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/add" element={<AddApplication />} />

        <Route path="/edit/:id" element={<EditApplication />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
