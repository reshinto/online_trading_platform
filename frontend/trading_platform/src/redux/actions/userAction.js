import axios from "axios";
import * as actionTypes from "../types";
import { db, tokenConfig } from "../utility";

const requestData = (dispatch, state, types) => {
  axios
    .get(`${db}/api/auth/user`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: types,
        payload: res.data
      });
    })
    .catch(err => {
      localStorage.removeItem("authToken");
      alert("You have been logged out due to inactivity for more than 2 hours")
      document.location.reload();
    });
};

export const getUserData = () => (dispatch, state) => {
  requestData(dispatch, state, actionTypes.GET_USER_DATA);
};

export const updateFail = error => {
  return {
    type: actionTypes.UPDATE_FAIL,
    // error: error,
    payload: error.response.data
  };
};

export const clearUpdateErrors = () => {
  return {
    type: actionTypes.CLEAR_UPDATE_ERRORS
  };
};

export const updateUserData = newData => (dispatch, state, types) => {
  axios
    .put(`${db}/api/auth/user`, newData, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.UPDATE_DATA,
        payload: res.data
      });
      dispatch(clearUpdateErrors());
    })
    .catch(err => {
      console.log(err);
      dispatch(updateFail(err));
    });
};


export const updateUserPassword = newData => (dispatch, state, types) => {
  axios
    .put(`${db}/api/auth/user/password/change`, newData, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.UPDATE_PASSWORD,
        payload: res.data
      });
      dispatch(clearUpdateErrors());
    })
    .catch(err => {
      console.log(err);
      dispatch(updateFail(err));
    });
};
