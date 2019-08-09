import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  multi: [{label: "SNAP", value: "SNAP", name: "Snap Inc. Class A"}]
};

const getSearchResult = (state, action) => {
  return updateObject(state, {
    multi: action.payload
  });
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_RESULTS:
      return getSearchResult(state, action);
    default:
      return state;
  }
};

export default searchReducer;
