/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Amount from "../../common/Amount";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Style
import "./Balance.scss"; // load scss properly

export class Balance extends Component {
  render() {
    const { wallet } = this.props;
    const { balance } = wallet;

    return (
      <div className="jur--balance">
        <h5>
          <AppContext.Consumer>
            {context => context.labels.jurBalance}
          </AppContext.Consumer>
        </h5>
        <Amount value={balance} />
      </div>
    );
  }
}
