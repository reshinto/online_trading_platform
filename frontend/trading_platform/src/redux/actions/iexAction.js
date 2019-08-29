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

export const getChart = (symbol, parameter) => (
  dispatch,
  state
) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_CHART,
    "stock",
    symbol,
    "chart",
    parameter
  );
};

export const getQuote = (symbol) => (
  dispatch,
  state
) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_QUOTE,
    "stock",
    symbol,
    "quote"
  );
};

export const getAdvStats = symbol => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_ADVANCED_STATS,
    "stock",
    symbol,
    "advancedStats"
  );
};

export const getKeyStats = symbol => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_KEY_STATS,
    "stock",
    symbol,
    "stats"
  );
};

export const getBalanceSheet = (symbol, query) => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_BALANCE_SHEET,
    "stock",
    symbol,
    "balanceSheet",
    query
  );
};

export const getCashFlow = (symbol, query) => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_CASH_FLOW,
    "stock",
    symbol,
    "cashFlow",
    query
  );
};

export const getIncomeStatement = (symbol, query) => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_INCOME_STATEMENT,
    "stock",
    symbol,
    "incomeStatement",
    query
  );
};

export const getIntraday = symbol => (dispatch, state) => {
  requestCloudData(
    dispatch,
    state,
    actionTypes.GET_INTRADAY_PRICES,
    "stock",
    symbol,
    "intradayPrices"
  );
};
