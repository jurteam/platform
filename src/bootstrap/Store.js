import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

// Drizzle
import { generateContractsInitialState } from 'drizzle'
import drizzleOptions from "./../config/drizzleOptions"

import createRootReducer from "./../reducers";

// Helpers
import { log } from "./../utils/helpers"; // log helpers

log('Drizzle - Initial state', generateContractsInitialState(drizzleOptions));

export const history = createBrowserHistory();
let store;

/**
 * Sets up the redux store.
 * @param {object} [initialState={}] - The initial state for the redux store, defaults to an empty object.
 * @param {{ dispatchSpy: function }} [integrationTestParams=[]] - Parameters necessary to setup integration tests.
 * @returns {{ store: object, history: object }} - An object with the store and the history objects.
 */
export default function configureStore(
  initialState = {
    contracts: generateContractsInitialState(drizzleOptions)
  },
  { dispatchSpy } = {}
) {
  const enhancers = [];
  const middleware = [];
  const composeEnhancers =
    process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  // Development Tools
  if (process.env.NODE_ENV === "development") {
    const reduxImmutableState = require("redux-immutable-state-invariant")
      .default;
    const reduxUnhandledAction = require("redux-unhandled-action").default;
    middleware.push(
      reduxImmutableState(),
      reduxUnhandledAction(action =>
        console.error(
          `${action} didn't lead to creation of a new state object`,
          action
        )
      )
    );
  }

  // Testing Tools
  if (dispatchSpy) {
    middleware.push(_store => next => action => {
      dispatchSpy(action);
      return next(action);
    });
  }

  middleware.push(routerMiddleware(history), ReduxThunk);
  enhancers.unshift(applyMiddleware(...middleware));
  store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  );
  return { store, history };
}

if (module.hot) {
  module.hot.accept("../reducers", () => {
    store.replaceReducer(createRootReducer(history));
  });
}
