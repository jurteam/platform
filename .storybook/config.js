import React from "react";
import { Provider } from 'react-redux'
import { configure, addDecorator } from "@storybook/react";
import requireContext from "require-context.macro";
import "../src/assets/scss/index.scss";
import "../src/bootstrap/Init";
import StoryRouter from "storybook-react-router";
import AppProvider from "../src/bootstrap/AppProvider";
import ErrorBoundary from "../src/bootstrap/ErrorBoundary";

// Drizzle
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "../src/config/drizzleOptions";

import { connector } from "../src/utils/helpers";
import configureStore from "../src/bootstrap/Store";
// destructuring store config
const { store, history } = configureStore();

addDecorator(StoryRouter());

const connectorValue = connector();

if (connectorValue === 'web3') 
{
  
  addDecorator(fn => (
      <AppProvider store={store}>
        <ErrorBoundary>
          <DrizzleProvider options={drizzleOptions} store={store}>
            {fn()}
          </DrizzleProvider>
        </ErrorBoundary>
      </AppProvider>
  ));

} 
else if (connectorValue === 'connex') 
{
  addDecorator(fn => (
    <AppProvider store={store}>
      <ErrorBoundary>       
        <Provider store={store}>
          {fn()}
        </Provider>   
      </ErrorBoundary>
    </AppProvider>
  ));
}

const req = requireContext("../src/components", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
