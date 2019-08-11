import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  funds: null,
};

const getFunds = (state, action) => {
  return updateObject(state, {
    funds: action.payload
  });
};

const deleteFunds = (state, action) => {
  return updateObject(state, {
    funds: state.funds.filter(
      funds => funds.id !== action.payload
    )
  });
};

const addFunds = (state, action) => {
  return updateObject(state, {
    funds: [...state.funds, action.payload]
  });
};

const fundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FUNDS:
      return addFunds(state, action);
    case actionTypes.GET_FUNDS:
      return getFunds(state, action);
    case actionTypes.DELETE_FUNDS:
      return deleteFunds(state, action);
    default:
      return state;
  }
};

export default fundsReducer;

