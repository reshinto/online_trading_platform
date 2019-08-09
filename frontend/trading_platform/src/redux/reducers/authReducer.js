import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
    isAuthenticated: true
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    // error: action.error,
    error: action.payload,
    loading: false,
  });
};

const clearErrors = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null
  });
};

const authLogout = (state, action) => {
  return updateObject(state, initialState);
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.CLEAR_ERRORS:
      return clearErrors(state, action);
    default:
      return state;
  }
};

export default authReducer;
