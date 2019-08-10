import axios from "axios";
import * as actionTypes from "../types";
import { tokenConfig } from "../utility";

const db = "http://127.0.0.1:8000/api/portfolio/";

export const getTrades = () => (dispatch, state) => {
  axios
    .get(`${db}`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.GET_TRADES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteTrade = id => (dispatch, state) => {
  axios
    .delete(`${db}${id}/`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_TRADE,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addTrade = trade => (dispatch, state) => {
  axios
    .post(`${db}`, trade, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.ADD_TRADE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
