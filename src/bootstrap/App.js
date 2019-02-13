import React, { Component } from "react";

import { Provider } from "react-redux";
import { Route, Switch } from "react-router"; // react-router v4
import { ConnectedRouter } from "connected-react-router";

// Context
import AppProvider from "./AppProvider";

// Initializer
import Initializer from "./Initializer"; // eslint-disable-line no-unused-vars

// Commons
import Header from "../components/common/Header";

// Sections
import NotFound from "../components/sections/NotFound";
import Home from "../components/sections/Home";
import Profile from "../components/sections/Profile";
import Contracts from "../components/sections/Contracts";
import Disputes from "../components/sections/Disputes";

// Drizzle
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "./../config/drizzleOptions";

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
    const { store, history, drizzle } = this.props;

    return (
      <AppProvider>
      <DrizzleProvider options={drizzleOptions} drizzle={drizzle}>
        <Provider store={store}>
          <Initializer>
            <ConnectedRouter history={history}>
              <>
                <Header context={drizzle} />
                <Switch>
                  <Route exact path="/" render={() => <Home />} />
                  <Route exact path="/profile" render={() => <Profile />} />
                  <Route exact path="/contracts" render={() => <Contracts />} />
                  <Route exact path="/disputes" render={() => <Disputes />} />
                  <Route render={() => <NotFound />} />
                </Switch>
                {this.renderTestReport()}
              </>
            </ConnectedRouter>
          </Initializer>
        </Provider>
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
