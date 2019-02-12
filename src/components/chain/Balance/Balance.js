/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContractData } from "drizzle-react-components";
import Amount from "./../../common/Amount";

// i18n
import lang from "./../../../assets/i18n/en.json";

// Style
import style from "./Balance.scss"; // load scss properly

export class Balance extends Component {
  constructor(props, context) {
    super(props);

    // this.contract = "JURToken"

    // console.log('balance context', context);

    // const { drizzle } = context;
    // const { contracts } = drizzle;

    // this.contracts = context.drizzle.contracts
    // console.log('balance contracts', contracts);
    // console.log('balance this.contracts', this.contracts);
    // console.log('balance typeof this.contracts', typeof this.contracts);
    // console.log('balance Object.keys(this.contracts).length', Object.keys(this.contracts).length);

    // // Get the contract ABI
    // // const abi = this.contracts[this.contract].abi;
    // // console.log('abi', abi);

    // // // Fetch initial value from chain and return cache key for reactive updates.
    // const methodArgs = []
    // // this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs)

    // console.log('balance props', this.props);
    // // console.log('this.dataKey', this.dataKey);
  }

  componentDidMount() {}
  render() {
    return (this.props.drizzleStatus.initialized &&
      <div className="jur--balance">
        <h5>{lang.jurBalance}</h5>
        <Amount
          value={
            <ContractData
              contract="JURToken"
              method="balanceOf"
              methodArgs={[this.props.accounts[0]]}
              hideIndicator={true}
            />
          }
        />
      </div>
    );
  }
}

Balance.contextTypes = {
  drizzle: PropTypes.object
}
