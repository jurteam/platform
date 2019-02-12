import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/index.scss";

import configureStore from "./bootstrap/Store";
import App from "./bootstrap/App";

import * as serviceWorker from "./bootstrap/serviceWorker";

// Drizzle
import { Drizzle, generateStore } from "drizzle";
import drizzleOptions from "./config/drizzleOptions"

// destructuring store config
const { store, history } = configureStore();
console.log('store', store);
export default store;

//initialise drizzle object, passing options and store
const drizzleStore = generateStore(drizzleOptions);
console.log('drizzleStore', drizzleStore);

export const drizzle = new Drizzle(drizzleOptions, drizzleStore);

// Random number is used so hot reloading works with `react-loadable`
const render = Component => {
  ReactDOM.render(
    <Component
      key={process.env.NODE_ENV === 'development' ? Math.random() : undefined}
      store={store}
      history={history}
      drizzle={drizzle}
    />,
    document.getElementById('root')
  )
}
// application render

render(App)

if (module.hot) {
  module.hot.accept('./bootstrap/App', () => {
    render(App)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
