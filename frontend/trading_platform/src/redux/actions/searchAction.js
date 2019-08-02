import * as actionTypes from "../types";

export const getSearchResult = result => {
  return {
    type: actionTypes.GET_SEARCH_RESULTS,
    payload: result
  }
};

