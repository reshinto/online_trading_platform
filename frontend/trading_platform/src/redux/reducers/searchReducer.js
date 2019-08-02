import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  multi: [{label: "SNAP", value: "SNAP"}]
};

const getSearchResult = (state, action) => {
  return updateObject(state, {
    multi: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_RESULTS:
      return getSearchResult(state, action);
    default:
      return state;
  }
};

export default reducer;

