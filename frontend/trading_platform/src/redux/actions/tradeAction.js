import axios from "axios";
import * as actionTypes from "../types";

const db = "http://127.0.0.1:8000/api/portfolio/";

export const getTrades = () => (dispatch, state) => {
  axios
    .get(`${db}`)
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

export const deleteTrade = (id) => (dispatch, state) => {
  axios
    .delete(`${db}${id}/`)
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

export const addTrade = trade => (dispatch, state, types) => {
  axios
    .post(`${db}`, trade)
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
