import React, { useState } from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";
import Switch from "../Switch";
import PriceRange from "../PriceRange";

import { ethToStore } from "../../../utils/helpers"; // helpers

import "./ContractSetPenaltyFee.scss";

export const ContractSetPenaltyFee = ({
  contract,
  setPenaltyFee,
  setPenaltyFeeStatus,
  handlePenaltyFee
}) => {
  const { from, to } = contract;
  const [isActive, setActive] = useState(!!contract.penaltyFee);

  const onPriceChange = (counterparty, fee) => {
    console.log("setPenaltyFee", counterparty, fee);
    setPenaltyFee(counterparty, fee);
  };

  const handlePenaltyFeeActive = ev => {
    const isActive = ev.target.checked;
    setActive(isActive);
    setPenaltyFeeStatus(isActive);
    if (typeof handlePenaltyFee === "function") handlePenaltyFee(isActive); // send callback
  };

  return (
    <div className="jur-contract-set-penalty-fee">
      <div className="jur-contract-set-penalty-fee__title">
        <BlockTitle title="Is there any penalty fee?" />
        <Switch onChange={handlePenaltyFeeActive} checked={isActive&& contract.amount > 0} />
      </div>
      <div
        className={`jur-contract-set-penalty-fee__values ${
          isActive && contract.amount > 0 ? "jur-contract-set-penalty-fee__values--active" : ""
        }`}
      >
        {[from, to].map((counterparty, index) => (contract.penaltyFee ?
          <PriceRange
            key={index}
            min={0}
            defaultValue={(contract.penaltyFee[counterparty.label] <= contract.amount) ?
              contract.penaltyFee && contract.penaltyFee[counterparty.label] : contract.amount
            }
            max={Number(contract.amount)}
            address={counterparty.wallet}
            onChange={(value) => onPriceChange(counterparty, ethToStore(value))}
          /> : null
        ))}
      </div>
    </div>
  );
};
