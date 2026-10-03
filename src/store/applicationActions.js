import axios from "axios";

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

const API_URL = "http://localhost:3007/applications";

const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message || "Request failed";
};

export const fetchApplications = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_APPLICATIONS_REQUEST });

    try {
      const response = await axios.get(API_URL);

      dispatch({
        type: FETCH_APPLICATIONS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_APPLICATIONS_FAILURE,
        payload: getErrorMessage(error),
      });
    }
  };
};

export const createApplication = (applicationData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_APPLICATION_REQUEST });

    try {
      const response = await axios.post(API_URL, applicationData);

      dispatch({
        type: CREATE_APPLICATION_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: CREATE_APPLICATION_FAILURE,
        payload: getErrorMessage(error),
      });

      throw error;
    }
  };
};

export const setApplicationSearch = (value) => ({
  type: SET_APPLICATION_SEARCH,
  payload: value,
});

export const setApplicationFilter = (value) => ({
  type: SET_APPLICATION_FILTER,
  payload: value,
});

export const updateApplication = (id, applicationData) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${encodeURIComponent(id)}`,
        applicationData,
      );

      dispatch({
        type: UPDATE_APPLICATION_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };
};

export const deleteApplication = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/${encodeURIComponent(id)}`);

      dispatch({
        type: DELETE_APPLICATION_SUCCESS,
        payload: id,
      });
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };
};
