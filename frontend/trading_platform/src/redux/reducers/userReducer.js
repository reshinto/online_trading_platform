import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  userData: {},
  updateData: {},
  updatePassword: {},
  updateError: null,
};

const getUserData = (state, action) => {
  return updateObject(state, {
    userData: action.payload
  });
};

const updateData = (state, action) => {
  return updateObject(state, {
    updateData: action.payload
  });
};

const updateFail = (state, action) => {
  return updateObject(state, {
    updateError: action.payload,
  });
};

const clearUpdateErrors = (state, action) => {
  return updateObject(state, {
    updateError: null
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA:
      return getUserData(state, action);
    case actionTypes.UPDATE_DATA:
      return updateData(state, action);
    case actionTypes.UPDATE_FAIL:
      return updateFail(state, action);
    case actionTypes.CLEAR_UPDATE_ERRORS:
      return clearUpdateErrors(state, action)
    default:
      return state;
  }
};

export default userReducer;
