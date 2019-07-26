import axios from "axios";
import * as actionTypes from "../types";
import IEX from "../../iexAPI/iex";
import IEXCloud from "../../iexAPI/iexCloud";

export const getData = (
  infixKey,
  optionKey,
  optionKey2,
  parameter2,
  ...parameter
) => (dispatch, state) => {
  const iex = new IEX();
  axios
    .get(
      iex.getFullUrl(infixKey, optionKey, optionKey2, parameter2, ...parameter)
    )
    .then(res => {
      dispatch({
        type: actionTypes.GET_DATA,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSymbols = () => (dispatch, state) => {
  const iex = new IEX();
  axios
    .get(
      iex.getFullUrl("symbols")
    )
    .then(res => {
      dispatch({
        type: actionTypes.GET_SYMBOLS,
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
  const iex = new IEXCloud();
  axios
    .get(iex.getFullUrl(infixKey, symbol, suffixKey, parameter, query))
    .then(res => {
      dispatch({
        type: actionTypes.GET_CLOUD_DATA,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
