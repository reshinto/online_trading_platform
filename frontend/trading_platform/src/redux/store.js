import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import iexReducer from "./reducers/iexReducer";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";
import tradeReducer from "./reducers/tradeReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  authReducer,
  iexReducer,
  userReducer,
  searchReducer,
  tradeReducer,
});

const enhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
