import axios from "axios";
import * as actionTypes from "../types";

const authProxy = "http://127.0.0.1:8000";

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

export const logout = () => {
  return dispatch => {
    axios
      .post(`${authProxy}/rest-auth/logout/`)
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
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${authProxy}/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
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
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${authProxy}/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
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
  const authToken = `Bearer ${token}`;
  localStorage.setItem('authToken', authToken);
  localStorage.setItem("expirationDate", expirationDate);
};
