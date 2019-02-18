import React, { Component } from "react";

// Context
import AppProvider from "./AppProvider";

// Initializer
import Initializer from "./Initializer";

// Drizzle
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "./../config/drizzleOptions";

class App extends Component {
  render() {
    const { store, history, testElement } = this.props;

    return (
      <AppProvider>
        <DrizzleProvider options={drizzleOptions} store={store}>
          <Initializer history={history} testElement={testElement} />
        </DrizzleProvider>
      </AppProvider>
    );
  }
}

App.defaultProps = {
  // Testing
  testElement: null
};

export default App;
