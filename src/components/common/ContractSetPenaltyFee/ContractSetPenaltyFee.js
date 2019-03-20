import React, { useState } from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";
import Switch from "../Switch";
import PriceRange from "../PriceRange";

import "./ContractSetPenaltyFee.scss";

export const ContractSetPenaltyFee = ({
  contract,
  ContractSetPenaltyFee,
  setPenaltyFeeStatus
}) => {
  const { from, to } = contract;
  const [isActive, setActive] = useState(!!contract.penaltyFee);

  const handlePenaltyFeeActive = ev => {
    const isActive = ev.target.checked;
    setActive(isActive);
    setPenaltyFeeStatus(isActive);
  };

  return (
    <div className="jur-contract-set-penalty-fee">
      <div className="jur-contract-set-penalty-fee__title">
        <BlockTitle title="Is there any penalty fee?" />
        <Switch onChange={handlePenaltyFeeActive} checked={isActive} />
      </div>
      <div
        className={`jur-contract-set-penalty-fee__values ${
          isActive ? "jur-contract-set-penalty-fee__values--active" : ""
        }`}
      >
        {[from, to].map((counterparty, index) => (
          <PriceRange
            key={index}
            min={0}
            defaultValue={
              contract.penaltyFee && contract.penaltyFee[counterparty.label]
            }
            max={counterparty.wallet.amount}
            address={counterparty.wallet.address}
            onChange={ContractSetPenaltyFee.bind(this, counterparty)}
          />
        ))}
      </div>
    </div>
  );
};
