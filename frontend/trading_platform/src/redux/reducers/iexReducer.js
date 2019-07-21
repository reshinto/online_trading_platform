import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  data: [],
};

const getData = (state, action) => {
  return updateObject(state, {
    data: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA:
      return getData(state, action);
    default:
      return state;
  }
};

export default reducer;
