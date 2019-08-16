import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  news: {}
};

const getNews = (state, action) => {
  return updateObject(state, {
    news: action.payload
  });
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NEWS:
      return getNews(state, action);
    default:
      return state;
  }
};

export default newsReducer;
