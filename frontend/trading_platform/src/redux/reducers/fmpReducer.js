import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  profile: {},
};

const getProfile = (state, action) => {
  return updateObject(state, {
    profile: action.payload
  });
};

const iexReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANY_PROFILE:
      return getProfile(state, action);
    default:
      return state;
  }
};

export default iexReducer;

