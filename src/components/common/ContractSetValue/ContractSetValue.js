import React, { Component } from "react";
import PropTypes from "prop-types";
import WhoPays from "../WhoPays";
import ContractSetPenaltyFee from "../ContractSetPenaltyFee";

import "./ContractSetValue.scss";

export class ContractSetValue extends Component {
  state = {
    contract: this.props.contract
  };

  setPenaltyFeeStatus = value => {
    console.log(value);
  };

  ContractSetPenaltyFee = (counterparty, fee) => {
    this.setState(state => {
      const contract = state.contract;
      contract.penaltyFee = {
        ...contract.penaltyFee,
        [counterparty.label]: fee
      };
      return { contract };
    });
  };

  handleSelectPayer = value => {
    this.setState(state => {
      const contract = state.contract;
      contract.amount = value;
      return { contract };
    });
  };

  render() {
    return (
      <div className="jur-contract-set-value">
        <div className="jur-contract-set-value__title">Contract Value:</div>
        <WhoPays
          contract={this.state.contract}
          handleSelectPayer={this.handleSelectPayer}
        />
        <ContractSetPenaltyFee
          contract={this.state.contract}
          setPenaltyFeeStatus={this.setPenaltyFeeStatus}
          ContractSetPenaltyFee={this.ContractSetPenaltyFee}
        />
      </div>
    );
  }
}
