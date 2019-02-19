import React, { Component } from "react";
import { Link } from "react-router-dom";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

export class Navbar extends Component {
  render() {
    return (
      <ul className="jur--navbar">
        <li>
          <Link to="/contracts">
            <AppContext.Consumer>
              {context => context.labels.contracts}
            </AppContext.Consumer>
          </Link>
        </li>
        <li>
          <Link to="/disputes">
            <AppContext.Consumer>
              {context => context.labels.disputes}
            </AppContext.Consumer>
          </Link>
        </li>
      </ul>
    );
  }
}
