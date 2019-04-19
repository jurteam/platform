import React, { useContext } from "react";
import PropTypes from "prop-types";
import WhoPays from "../WhoPays";
import ContractSetPenaltyFee from "../ContractSetPenaltyFee";
import { toCurrencyFormat, ellipsisString } from '../../../utils/helpers';

import "./ContractSetValue.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context
import BlockTitle from "../BlockTitle";

export const ContractSetValue = (props) => {

  const { contract } = props;

  const setPenaltyFeeStatus = value => {
    console.log(value);

    props.onChange("hasPenaltyFee", value);
  };

  const setPenaltyFee = (counterparty, fee) => {
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
    props.onChange(`${counterparty.label}PenaltyFee`, fee);
  };

  const handleSelectPayer = payer => {
    console.log("handleSelectPayer", payer);

    // props.onChange("value", payer.value);
    props.onChange("whoPays", payer.counterParty.wallet.toLowerCase());

    // this.setState(state => {
    //   const contract = state.contract;
    //   contract.amount = payer.value;
    //   return { contract };
    // });
  };

  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-set-value">
      <div className="jur-contract-set-value__title">{`${labels.contractValue}:`}</div>
      <WhoPays
        contract={contract}
        handleSelectPayer={handleSelectPayer}
        error={!props.currentUserCanPay}
        onChange={props.onChange}
        hasError={props.hasError}
        disabled={props.disabled}
        />
      <ContractSetPenaltyFee
        contract={props.contract}
        setPenaltyFeeStatus={setPenaltyFeeStatus}
        setPenaltyFee={setPenaltyFee}
        disabled={props.disabled}
      />
      { props.showFeeMsg && props.contract.penaltyFee !== null && typeof props.contract.to.wallet !== "undefined" &&
        <div className={`jur-contract-set-value__fee-msg ${(props.currentUserCanPay) ? "": "jur-form__numeric-input--error"}`}>
          <BlockTitle title={labels.youNeedToPay.replace("%fee%", toCurrencyFormat(props.feeToPay)).replace("%wallet%", ellipsisString(props.contract.to.wallet.toLowerCase(), 16))} description={labels.youNeedToPayDescription} />
      </div>
      }
    </div>
  );
}