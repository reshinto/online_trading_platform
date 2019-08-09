import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  tradeData: []
};

const getTrades = (state, action) => {
  return updateObject(state, {
    tradeData: action.payload
  });
};

const deleteTrade = (state, action) => {
  return updateObject(state, {
    tradeData: state.tradeData.filter(
      tradeData => tradeData.id !== action.payload
    )
  });
};

const addTrade = (state, action) => {
  return updateObject(state, {
    tradeData: [...state.tradeData, action.payload]
  });
};

const tradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRADE:
      return addTrade(state, action);
    case actionTypes.GET_TRADES:
      return getTrades(state, action);
    case actionTypes.DELETE_TRADE:
      return deleteTrade(state, action);
    default:
      return state;
  }
};

export default tradeReducer;
