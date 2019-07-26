import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  data: [],
  cloudData: [],
  symbols: [],
};

const getData = (state, action) => {
  return updateObject(state, {
    data: action.payload
  });
};

const getCloudData = (state, action) => {
  return updateObject(state, {
    cloudData: action.payload
  });
};

const getSymbols = (state, action) => {
  return updateObject(state, {
    symbols: action.payload
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA:
      return getData(state, action);
    case actionTypes.GET_CLOUD_DATA:
      return getCloudData(state, action);
    case actionTypes.GET_SYMBOLS:
      return getSymbols(state, action);
    default:
      return state;
  }
};

export default reducer;
