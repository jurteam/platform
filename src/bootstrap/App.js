import React, { Component } from "react";

import { Route, Switch, Router } from "react-router"; // react-router v4

// Context
import AppProvider from "./AppProvider";

// Initializer
import Initializer from "./Initializer"; // eslint-disable-line no-unused-vars

// Routes
import { createRoutes } from "./Routing";

// Commons
import Header from "../components/common/Header";

// Drizzle
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "./../config/drizzleOptions";

const Routes = createRoutes();

class App extends Component {
  constructor(props) {
    super(props);

    this.renderTestReport = this.renderTestReport.bind(this);
  }

  renderTestReport() {
    const { testElement } = this.props;
    return process.env.NODE_ENV === "development" ? testElement : null;
  }

  render() {
    const { store, history } = this.props;

    return (
      <AppProvider>
        <DrizzleProvider options={drizzleOptions} store={store}>
          <Initializer>
            <Router history={history}>
              <>
                <Header />
                <Switch>
                  {Routes.map((params, key) => (
                    <Route {...params} key={key} />
                  ))}
                </Switch>
                {this.renderTestReport()}
              </>
            </Router>
          </Initializer>
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
