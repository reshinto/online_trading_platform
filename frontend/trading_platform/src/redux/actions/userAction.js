import axios from "axios";
import * as actionTypes from "../types";

const db = "http://127.0.0.1:8000";
const _token = localStorage.getItem("authToken");

const requestData = (dispatch, state, types) => {
  axios
    .get(`${db}/rest-auth/user/`, {
      headers: {
        Authorization: _token
      }
    })
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
