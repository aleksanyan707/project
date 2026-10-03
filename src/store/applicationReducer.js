import {
  FETCH_APPLICATIONS_REQUEST,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATIONS_FAILURE,
  CREATE_APPLICATION_REQUEST,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_FAILURE,
  SET_APPLICATION_SEARCH,
  SET_APPLICATION_FILTER,
  UPDATE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_SUCCESS,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  saving: false,
  error: null,
  search: "",
  statusFilter: "all",
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPLICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_APPLICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case FETCH_APPLICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_APPLICATION_REQUEST:
      return {
        ...state,
        saving: true,
        error: null,
      };

    case CREATE_APPLICATION_SUCCESS:
      return {
        ...state,
        saving: false,
        items: [...state.items, action.payload],
      };

    case CREATE_APPLICATION_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };

    case SET_APPLICATION_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    case SET_APPLICATION_FILTER:
      return {
        ...state,
        statusFilter: action.payload,
      };

    case UPDATE_APPLICATION_SUCCESS:
      return {
        ...state,
        items: state.items.map((application) =>
          String(application.id) === String(action.payload.id)
            ? action.payload
            : application,
        ),
      };

    case DELETE_APPLICATION_SUCCESS:
      return {
        ...state,
        items: state.items.filter(
          (application) => String(application.id) !== String(action.payload),
        ),
      };

    default:
      return state;
  }
};

export default applicationReducer;
