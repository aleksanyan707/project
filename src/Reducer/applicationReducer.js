export const initialState = {
  applications: [],
  loading: false,
  error: null,
};

export const applicationReducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return {
        ...state,
        applications: action.payload,
      };

    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };

    case "DELETE_APPLICATION":
      return {
        ...state,
        applications: state.applications.filter(
          (application) => application.id !== action.payload,
        ),
      };

    case "UPDATE_APPLICATION":
      return {
        ...state,
        applications: state.applications.map((application) =>
          application.id === action.payload.id ? action.payload : application,
        ),
      };

    case "CHANGE_STATUS":
      return {
        ...state,
        applications: state.applications.map((application) =>
          application.id === action.payload.id
            ? { ...application, status: action.payload.status }
            : application,
        ),
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
