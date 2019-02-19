import React, { Component } from "react";

import AppProvider from "./AppProvider"; // App Context

import ErrorBoundary from "./ErrorBoundary"; // Errors

// Drizzle
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "../config/drizzleOptions";

// Components
import Spinner from "../components/common/Spinner";

import UnderAuth from "./UnderAuth";
import Initializer from "./Initializer"; // Initializer

class App extends Component {
  render() {
    const { store, history, testElement } = this.props;

    return (
      <AppProvider store={store}>
        <ErrorBoundary>
          <>
            <Spinner store={store} />
            <UnderAuth>
              <DrizzleProvider options={drizzleOptions} store={store}>
                <Initializer history={history} testElement={testElement} />
              </DrizzleProvider>
            </UnderAuth>
          </>
        </ErrorBoundary>
      </AppProvider>
    );
  }
}

App.defaultProps = {
  // Testing
  testElement: null
};

export default App;
