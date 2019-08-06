import axios from "axios";
import * as actionTypes from "../types";
import IEX from "../../iexAPI/iex";
import IEXCloud from "../../iexAPI/iexCloud";

const requestData = (
  dispatch,
  state,
  types,
  infixKey,
  optionKey,
  optionKey2,
  parameter2,
  ...parameter
) => {
  const iex = new IEX();
  axios
    .get(
      iex.getFullUrl(infixKey, optionKey, optionKey2, parameter2, ...parameter)
    )
    .then(res => {
      dispatch({
        type: types,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getData = (
  infixKey,
  optionKey,
  optionKey2,
  parameter2,
  ...parameter
) => (dispatch, state) => {
  requestData(
    dispatch,
    state,
    actionTypes.GET_DATA,
    infixKey,
    optionKey,
    optionKey2,
    parameter2,
    ...parameter
  );
};

export const getSymbols = () => (dispatch, state) => {
  requestData(dispatch, state, actionTypes.GET_SYMBOLS, "symbols");
};

const requestCloudData = (
  dispatch,
  state,
  types,
  infixKey,
  symbol,
  suffixKey,
  parameter,
  query
) => {
  const iex = new IEXCloud();
  axios
    .get(iex.getFullUrl(infixKey, symbol, suffixKey, parameter, query))
    .then(res => {
      dispatch({
        type: types,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCloudData = (infixKey, symbol, suffixKey, parameter, query) => (
  dispatch,
  state
) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_CLOUD_DATA,
    infixKey,
    symbol,
    suffixKey,
    parameter,
    query
  );
};

export const getNews = (symbol, parameter) => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_NEWS_DATA,
    "stock",
    symbol,
    "newsLast",
    parameter
  );
};

export const getProfile = (symbol, parameter) => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_COMPANY_PROFILE,
    "stock",
    symbol,
    "company"
  );
};

export const getAdvStats = (symbol, parameter) => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_ADVANCED_STATS,
    "stock",
    symbol,
    "advancedStats"
  );
};
