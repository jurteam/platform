/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { Route, Switch, Router } from "react-router"; // react-router v4

import PropTypes from "prop-types";

// Routes
import { createRoutes } from "./Routing";

const Routes = createRoutes();

class Initializer extends PureComponent {
  constructor(props, context) {
    super(props);

    const { drizzle } = context;

    // Load Drizzle context globally for actions
    global.drizzle = drizzle;

    this.renderTestReport = this.renderTestReport.bind(this);
  }

  renderTestReport() {
    const { testElement } = this.props;
    return process.env.NODE_ENV === "development" ? testElement : null;
  }

  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <>
          <Switch>
            {Routes.map((params, key) => (
              <Route {...params} key={key} />
            ))}
          </Switch>

          {this.renderTestReport()}
        </>
      </Router>
    );
  }
}

Initializer.contextTypes = {
  drizzle: PropTypes.object
};

export default Initializer;
