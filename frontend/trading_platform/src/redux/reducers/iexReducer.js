import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  data: [],
  cloudData: [],
  symbols: [],
  news: [],
  profile: {},
  advStats: {},
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
};

const getNews = (state, action) => {
  return updateObject(state, {
    news: action.payload
  });
};

const getProfile = (state, action) => {
  return updateObject(state, {
    profile: action.payload
  });
};

const getAdvStats = (state, action) => {
  return updateObject(state, {
    advStats: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA:
      return getData(state, action);
    case actionTypes.GET_CLOUD_DATA:
      return getCloudData(state, action);
    case actionTypes.GET_SYMBOLS:
      return getSymbols(state, action);
    case actionTypes.GET_NEWS_DATA:
      return getNews(state, action);
    case actionTypes.GET_COMPANY_PROFILE:
      return getProfile(state, action);
    case actionTypes.GET_ADVANCED_STATS:
      return getAdvStats(state, action);
    default:
      return state;
  }
};

export default reducer;
