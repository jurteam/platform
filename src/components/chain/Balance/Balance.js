/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContractData } from "drizzle-react-components";
import Amount from "./../../common/Amount";

// Context
import { AppContext } from "./../../../bootstrap/AppProvider";

// Style
import style from "./Balance.scss"; // load scss properly

export class Balance extends Component {
  constructor(props, context) {
    super(props);

    console.log('balance context', context);

    const { drizzle } = context;

    this.drizzle = drizzle;

  }

  componentDidMount() {

  }
  render() {

    let    balance = <span>0</span>

    if (this.props.drizzleStatus.initialized) {

      this.contract = "JURToken"
      const { contracts } = this.drizzle;

      console.log('balance this.drizzle', this.drizzle);

      this.contracts = this.drizzle.contracts
      console.log('balance contracts', contracts);
      console.log('balance this.contracts', this.contracts);
      console.log('balance typeof this.contracts', typeof this.contracts);
      console.log('balance Object.keys(this.contracts).length', Object.keys(this.contracts).length);

      // Get the contract ABI
      console.log('balance this.props.drizzleStatus', this.props.drizzleStatus)
      console.log('balance this.contracts[this.contract]', this.contracts[this.contract])
      const abi = this.contracts[this.contract].abi;
      console.log('balance abi', abi);

      const method = "balanceOf"

      // Fetch initial value from chain and return cache key for reactive updates.
      const methodArgs = [this.props.wallet.address]
      this.dataKey = this.contracts[this.contract].methods[method].cacheCall(...methodArgs)

      // console.log('balance props', this.props);
      console.log('balance this.dataKey', this.dataKey);
      console.log('balance this.contracts[this.contract].methods[method]', this.contracts[this.contract].methods[method]);
      console.log('balance this.props.JURToken', this.props.JURToken);
      console.log('balance this.props.JURToken[method]', this.props.JURToken[method]);
      console.log('balance this.props.JURToken.balanceOf[this.dataKey]', this.props.JURToken.balanceOf[this.dataKey]);

      balance = this.props.JURToken.balanceOf[this.dataKey] ? this.props.JURToken.balanceOf[this.dataKey].value : 0
    }

    return (
      <div className="jur--balance">
        {this.props.drizzleStatus.initialized && (
          <>
            <h5>
              <AppContext.Consumer>
                {context => context.labels.jurBalance}
              </AppContext.Consumer>
            </h5>
            <Amount value={balance} />
          </>
        )}
      </div>
    );
  }
}

Balance.contextTypes = {
  drizzle: PropTypes.object
};
