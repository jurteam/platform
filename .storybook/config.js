import React from "react";
import { configure, addDecorator } from "@storybook/react";
import requireContext from "require-context.macro";

import StoryRouter from "storybook-react-router";
import AppProvider from "../src/bootstrap/AppProvider";
import ErrorBoundary from "../src/bootstrap/ErrorBoundary";

// Drizzle
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "../src/config/drizzleOptions";

import configureStore from "../src/bootstrap/Store";
// destructuring store config
const { store, history } = configureStore();

addDecorator(StoryRouter());

addDecorator(fn => (
  <AppProvider store={store}>
    <ErrorBoundary>
      <DrizzleProvider options={drizzleOptions} store={store}>
        {fn()}
      </DrizzleProvider>
    </ErrorBoundary>
  </AppProvider>
));

const req = requireContext("../src/components", true, /\.stories\.js$/);
require("../src/assets/scss/_variables.scss");
require("../src/assets/scss/_fonts.scss");
require("../src/assets/scss/_base.scss");
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
