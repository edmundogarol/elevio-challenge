import React from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import AppPage from "./pages/App";
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
  return (
    <Provider store={store}>
      <AppPage />
    </Provider>
  );
}

export default App;
