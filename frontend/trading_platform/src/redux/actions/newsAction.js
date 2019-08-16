import axios from "axios";
import * as actionTypes from "../types";

const newsApi = "https://newsapi.org/v2/everything?q=";
const apiKey = process.env.REACT_APP_newsAPI;

export const getNews = query => (dispatch, state) => {
  axios
    .get(`${newsApi}${query}&apiKey=${apiKey}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_NEWS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
