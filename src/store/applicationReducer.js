import {
  FETCH_APPLICATIONS_REQUEST,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATIONS_FAILURE,
  CREATE_APPLICATION_REQUEST,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_FAILURE,
} from "./actionTypes";

const initialState = {
  items: [],
  loading: false,
  saving: false,
  error: null,
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

    default:
      return state;
  }
};

export default applicationReducer;
