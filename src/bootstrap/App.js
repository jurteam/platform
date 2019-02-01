import React, { Component } from "react";

import { Provider } from "react-redux";
import { Route, Switch } from "react-router"; // react-router v4
import { ConnectedRouter } from "connected-react-router";

// Initializer
import Initializer from "./Initializer";

// Sections
import NotFound from "../components/sections/NotFound"
import Home from "../components/sections/Home"

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
      <Provider store={store}>
        <Initializer>
          <ConnectedRouter history={history}>
            <>
              <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route render={() => <NotFound />} />
              </Switch>
              {this.renderTestReport()}
            </>
          </ConnectedRouter>
        </Initializer>
      </Provider>
    );
  }
}

App.defaultProps = {
  // Testing
  testElement: null
};

export default App;
