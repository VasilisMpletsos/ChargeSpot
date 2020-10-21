import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./store/reducer";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { watchLogin } from './store/sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(logger,sagaMiddleware)
));
//const store = createStore(reducer);

sagaMiddleware.run(watchLogin)
console.log(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
