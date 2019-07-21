import axios from "axios";
import * as actionTypes from "../types";
import IEX from "../../iexAPI/iex";

export const getData = (infixKey, optionKey, parameter) => (
  dispatch,
  state
) => {
  const iex = new IEX();
  axios
    .get(iex.getFullUrl(infixKey, optionKey, parameter))
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
