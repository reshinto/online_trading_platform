import axios from "axios";
import * as actionTypes from "../types";
import { tokenConfig } from "../utility";

const db = "http://127.0.0.1:8000/api/auth";

const requestData = (dispatch, state, types) => {
  axios
    .get(`${db}/user`, tokenConfig(state))
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

export const getUserData = () => (dispatch, state) => {
  requestData(dispatch, state, actionTypes.GET_USER_DATA);
};



