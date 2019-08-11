import axios from "axios";
import * as actionTypes from "../types";
import { tokenConfig } from "../utility";

const db = "http://127.0.0.1:8000/api/funds/";

export const getFunds = () => (dispatch, state) => {
  axios
    .get(`${db}`, tokenConfig(state))
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
    .delete(`${db}${id}/`, tokenConfig(state))
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
    .post(`${db}`, fund, tokenConfig(state))
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

