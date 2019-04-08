import React, { Component } from "react";
import PropTypes from "prop-types";
import WhoPays from "../WhoPays";
import ContractSetPenaltyFee from "../ContractSetPenaltyFee";

import "./ContractSetValue.scss";

export class ContractSetValue extends Component {

  setPenaltyFeeStatus = value => {
    console.log(value);

    this.props.onChange("hasPenaltyFee", value);
  };

  setPenaltyFee = (counterparty, fee) => {
    // this.setState(state => {
    //   const contract = state.contract;
    //   contract.penaltyFee = {
    //     ...contract.penaltyFee,
    //     [counterparty.label]: fee
    //   };
    //   return { contract };
    // });

    console.log(`setPenaltyFee - counterparty`, counterparty);
    console.log(`setPenaltyFee - fee`, fee);
    console.log(`setPenaltyFee - ${counterparty.label}PenaltyFee`, fee);
    this.props.onChange(`${counterparty.label}PenaltyFee`, fee);
  };

  handleSelectPayer = payer => {
    console.log("handleSelectPayer", payer);

    this.props.onChange("value", payer.value);
    this.props.onChange("whoPays", payer.counterParty.wallet);

    // this.setState(state => {
    //   const contract = state.contract;
    //   contract.amount = payer.value;
    //   return { contract };
    // });
  };

  render() {
    return (
      <div className="jur-contract-set-value">
        <div className="jur-contract-set-value__title">Contract Value:</div>
        <WhoPays
          contract={this.props.contract}
          handleSelectPayer={this.handleSelectPayer}
          error={!this.props.currentUserCanPay}
          disabled={this.props.disabled}
        />
        <ContractSetPenaltyFee
          contract={this.props.contract}
          setPenaltyFeeStatus={this.setPenaltyFeeStatus}
          setPenaltyFee={this.setPenaltyFee}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}
