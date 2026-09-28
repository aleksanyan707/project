import { useEffect, useReducer } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { applicationReducer, initialState } from "./Reducer/applicationReducer";
import Layout from "./components/Layout";
import AddApplication from "./pages/AddApplication";
import Dashboard from "./pages/Dashboard";
import EditApplication from "./pages/EditApplication";

import "./App.css";

const getInitialState = () => {
  try {
    const savedApplications = localStorage.getItem("applications");

    return {
      ...initialState,
      applications: savedApplications ? JSON.parse(savedApplications) : [],
    };
  } catch (error) {
    return initialState;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(
    applicationReducer,
    initialState,
    getInitialState,
  );

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(state.applications));
  }, [state.applications]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Dashboard applications={state.applications} dispatch={dispatch} />
          }
        />

        <Route path="/add" element={<AddApplication dispatch={dispatch} />} />

        <Route
          path="/edit/:id"
          element={
            <EditApplication
              applications={state.applications}
              dispatch={dispatch}
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
