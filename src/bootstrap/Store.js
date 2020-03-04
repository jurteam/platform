import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { createBrowserHistory } from "history";

import { composeWithDevTools } from 'remote-redux-devtools'
// Drizzle
import { generateContractsInitialState } from "drizzle";
import drizzleOptions from "../config/drizzleOptions";

import createRootReducer from "../reducers";

// Redux Saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

// Helpers
import { log, connector } from "../utils/helpers"; // log helpers

log("Drizzle - Initial state", generateContractsInitialState(drizzleOptions));

let store;
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();  // Redux Saga Middleware

const composeEnhancers =
  (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "stage") ?
  connector() === 'web3' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : composeWithDevTools({
      realtime: true,
      name: 'Jur local',
      hostname: 'localhost',
      port: 8000 // the port your remotedev server is running at
    })
    : compose;

/**
 * Sets up the redux store.
 * @param {object} [initialState={}] - The initial state for the redux store, defaults to an empty object.
 * @param {{ dispatchSpy: function }} [integrationTestParams=[]] - Parameters necessary to setup integration tests.
 * @returns {{ store: object, history: object }} - An object with the store and the history objects.
 */
export default function configureStore(
  initialState = {
    accounts: {},
    accountBalances: {},
    currentBlock: {},
    drizzleStatus: {},
    transactions: {},
    transactionStack: {},
    web3: {},
    contracts: generateContractsInitialState(drizzleOptions)
  },
  { dispatchSpy } = {}
) {

  const middleware = [];

  // Development Tools
  if (process.env.NODE_ENV === "development") {
    const reduxImmutableState = require("redux-immutable-state-invariant")
      .default;
    const reduxUnhandledAction = require("redux-unhandled-action").default;
    middleware.push(
      reduxImmutableState(),
      reduxUnhandledAction((action) =>
        log(
          `UNHANDLED ACTION: ${action} didn't lead to creation of a new state object`,
          action,
          1
        )
      )
    );
  }

  // Testing Tools
  if (dispatchSpy) {
    middleware.push((_store) => (next) => (action) => {
      dispatchSpy(action);
      return next(action);
    });
  }

  middleware.push(sagaMiddleware, ReduxThunk);

  store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  global.store = store;

  sagaMiddleware.run(rootSaga); // run sagas

  return { store, history };
}

if (module.hot) {
  module.hot.accept("../reducers", () => {
    store.replaceReducer(createRootReducer(history));
  });
}
