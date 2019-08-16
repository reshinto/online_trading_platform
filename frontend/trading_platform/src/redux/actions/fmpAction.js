import axios from "axios";
import * as actionTypes from "../types";

export const getProfile = symbol => (dispatch, state) => {
  axios
    .get(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_COMPANY_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
