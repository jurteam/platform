import React, { Component } from "react";
import PropTypes from "prop-types";
import WhoPays from "../WhoPays";
import ContractSetPenaltyFee from "../ContractSetPenaltyFee";
import InfoTooltip from '../InfoTooltip';
import { toCurrencyFormat, ellipsisString } from '../../../utils/helpers';

import "./ContractSetValue.scss";

export class ContractSetValue extends Component {
  state = {
    contract: this.props.contract,
    feeToPay: 1100
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
        { this.props.showFeeMsg &&
          <div className="jur-contract-set-value__fee-msg">
            <InfoTooltip />
            {" "}
            <span>You need to pay {toCurrencyFormat(this.state.feeToPay)} if {ellipsisString(this.props.contract.to.wallet.address, 16)} accepts the contract</span>
        </div>
        }
      </div>
    );
  }
}
