/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { Route, Switch, Router } from "react-router"; // react-router v4

import PropTypes from "prop-types";

// Connector
import { drizzleConnect } from "drizzle-react"

// Routes
import { createRoutes } from "./Routing";

// Commons
import Disclaimer from "../components/common/Disclaimer";

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
    const { history, wallet } = this.props;
    return (
      <Router history={history}>
        <>
          <Switch>
            {Routes.map((params, key) => (
              <Route {...params} key={key} />
            ))}
          </Switch>

          <Disclaimer
            isOpen={false}
            title="Disclaimer"
            description="Jur is an interface on the blockchain. Jur can als…"
            accepted={false}
            declineLabel="Decline"
            acceptLabel="Accept"
            closeLabel="Close"
            onAccept={() => null}
            onClose={() => null}
            onDecline={() => null}
          />

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
