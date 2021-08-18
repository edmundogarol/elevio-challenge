import React from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "antd/dist/antd.css";

import AppPage from "./pages/App";
import Article from "./pages/Article";
import appSaga from "./sagas/App";
import appReducer from "./reducers/App";

/**
 * Set up and run app sagas listening for events
 */

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(appSaga);

function App() {
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={AppPage} />
        <Route path="/article/:id/" component={Article} />
      </Router>
    </Provider>
  );
}

export default App;
