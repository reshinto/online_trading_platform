import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  userData: {},
};

const getUserData = (state, action) => {
  return updateObject(state, {
    userData: action.payload
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA:
      return getUserData(state, action);
    default:
      return state;
  }
};

export default userReducer;
