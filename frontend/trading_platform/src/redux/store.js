import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import iexReducer from "./reducers/iexReducer";
import searchReducer from "./reducers/searchReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  authReducer,
  iexReducer,
  searchReducer,
});

const enhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
