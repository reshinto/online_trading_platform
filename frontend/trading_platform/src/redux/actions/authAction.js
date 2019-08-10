import axios from "axios";
import * as actionTypes from "../types";
import { tokenConfig } from "../utility";

const authProxy = "http://127.0.0.1:8000/api/auth";

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
      .post(`${authProxy}/logout`, null, tokenConfig(state))
      .then(res => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("expirationDate");
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
      `${authProxy}/login`,
      {
        username: username,
        password: password
      },
      config
    )
    .then(res => {
      const token = res.data.token;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      setAuthorizationHeader(token, expirationDate);
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
      `${authProxy}/register`,
      {
        username: username,
        email: email,
        password: password
      },
      config
    )
    .then(res => {
      const token = res.data.token;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      setAuthorizationHeader(token, expirationDate);
      dispatch(authSuccess(token));
      dispatch(clearErrors());
      dispatch(checkAuthTimeout(3600));
    })
    .catch(err => {
      dispatch(authFail(err));
    });
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("authToken");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

const setAuthorizationHeader = (token, expirationDate) => {
  const authToken = `Token ${token}`;
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("expirationDate", expirationDate);
};
