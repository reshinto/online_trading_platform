import axios from "axios";
import * as actionTypes from "../types";
import { db, tokenConfig } from "../utility";

export const getTrades = () => (dispatch, state) => {
  axios
    .get(`${db}/api/portfolio/`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.GET_TRADES,
        payload: res.data
      });
    })
    .catch(err => {
      localStorage.removeItem("authToken");
      alert("You have been logged out due to inactivity for more than 2 hours")
      document.location.reload();
    });
};

export const deleteTrade = id => (dispatch, state) => {
  axios
    .delete(`${db}/api/portfolio/${id}/`, tokenConfig(state))
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
    .post(`${db}/api/portfolio/`, trade, tokenConfig(state))
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
