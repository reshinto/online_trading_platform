import axios from "axios";
import * as actionTypes from "../types";
import { db, tokenConfig } from "../utility";

export const getFunds = () => (dispatch, state) => {
  axios
    .get(`${db}/api/funds/`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.GET_FUNDS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    });
};

export const deleteFunds = id => (dispatch, state) => {
  axios
    .delete(`${db}/api/funds/${id}/`, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_FUNDS,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addFunds = fund => (dispatch, state) => {
  axios
    .post(`${db}/api/funds/`, fund, tokenConfig(state))
    .then(res => {
      dispatch({
        type: actionTypes.ADD_FUNDS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

