import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { pizzaReducer } from "./pizza/reducer/pizzaReducer";

const reducer = combineReducers({
  pizza: pizzaReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
