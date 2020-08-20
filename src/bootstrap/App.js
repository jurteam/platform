import React, { Component } from "react";

import Init from "./Init";

import { Provider } from "react-redux";
import AppProvider from "./AppProvider"; // App Context

import ErrorBoundary from "./ErrorBoundary"; // Errors

// Drizzle
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "../config/drizzleOptions";

// Components
import Spinner from "../components/common/Spinner";

import UnderAuth from "./UnderAuth";
import Initializer from "./Initializer"; // Initializer
import { log, connector, connection } from "../utils/helpers";
import Disclaimer from "JurCommon/Disclaimer";

log("App init", process.env);

class App extends Component {
  constructor(props) {
    super(props);
    this.connectorValue = connector();
  }

  componentDidMount() {
    if (this.connectorValue === "connex") {
      const { store } = this.props;
      global.store = store;
    }
  }

  render() {
    const { store, history, testElement } = this.props;

    // log('connnnnnnnnnection---g---', typeof connection)

    log("App - connector", this.connectorValue);

    if (this.connectorValue === "web3") {
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
    } else if (this.connectorValue === "connex") {
      return (
        <AppProvider store={store}>
          <ErrorBoundary>
            <>
              <Spinner store={store} />
              <UnderAuth>
                <Provider store={store}>
                  <Initializer history={history} testElement={testElement} />
                  <Disclaimer />
                </Provider>
              </UnderAuth>
            </>
          </ErrorBoundary>
        </AppProvider>
      );
    }
  }
}

App.defaultProps = {
  // Testing
  testElement: null
};

export default App;
