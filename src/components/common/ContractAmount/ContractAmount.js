import React from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";
import Avatar from "../Avatar";
import Amount from "../Amount";

import "./ContractAmount.scss";

export const ContractAmount = props => {
  const {
    debtorWalletAddress,
    amount,
    paymentDescription
  } = props;
return (
  <div className="jur-contract-amount">
    <BlockTitle title="Payment" description={paymentDescription} />
    {debtorWalletAddress && amount && (
      <div className="jur-contract-amount__value">
        <Avatar seed={debtorWalletAddress} size="xxsmall" />
        <Amount value={amount} />
      </div>
    )}
  </div>
)};
  