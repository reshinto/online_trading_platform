import axios from "axios";
import * as actionTypes from "../types";
import { db, tokenConfig } from "../utility";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    // error: error,
    payload: error.response.data
  };
};

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logout = () => (dispatch, state) => {
  axios
    .post(`${db}/api/auth/logout`, null, tokenConfig(state))
    .then(res => {
      localStorage.removeItem("authToken");
      dispatch(logoutSuccess());
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch(authFail(err));
    });
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const login = (username, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  dispatch(authStart());
  axios
    .post(
      `${db}/api/auth/login`,
      {
        username: username,
        password: password
      },
      config
    )
    .then(res => {
      const token = res.data.bearer;
      setAuthorizationHeader(token);
      dispatch(authSuccess(token));
      dispatch(clearErrors());
      dispatch(checkAuthTimeout(3600));
    })
    .catch(err => {
      dispatch(authFail(err));
    });
};

export const signup = (username, email, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  dispatch(authStart());
  axios
    .post(
      `${db}/api/auth/register`,
      {
        username: username,
        email: email,
        password: password
      },
      config
    )
    .then(res => {
      const token = res.data.bearer;
      setAuthorizationHeader(token);
      dispatch(authSuccess(token));
      dispatch(clearErrors());
      dispatch(checkAuthTimeout(3600));
    })
    .catch(err => {
      dispatch(authFail(err));
    });
};

const setAuthorizationHeader = token => {
  const authToken = `Bearer ${token}`;
  localStorage.setItem("authToken", authToken);
};
