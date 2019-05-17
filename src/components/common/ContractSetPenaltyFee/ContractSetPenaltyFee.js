import React, { useState, useContext } from "react";

import BlockTitle from "../BlockTitle";
import Switch from "../Switch";
import PriceRange from "../PriceRange";

import { ethToStore } from "../../../utils/helpers"; // helpers

import "./ContractSetPenaltyFee.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractSetPenaltyFee = ( props ) => {
  const {
    contract,
    disabled,
    setPenaltyFee,
    setPenaltyFeeStatus,
    handlePenaltyFee
  } = props;
  const { from, to } = contract;
  const [isActive, setActive] = useState(!!contract.penaltyFee);

  const onPriceChange = (counterparty, fee) => {
    console.log("setPenaltyFee", counterparty, fee);
    setPenaltyFee(counterparty, fee);
  };

  const handlePenaltyFeeActive = (ev) => {
    const isActive = ev.target.checked;
    setActive(isActive);
    setPenaltyFeeStatus(isActive);
    if (typeof handlePenaltyFee === "function") handlePenaltyFee(isActive); // send callback
  };

  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-set-penalty-fee">
      <div className="jur-contract-set-penalty-fee__title">
        <BlockTitle title={labels.isThereAnyPenaltyFee} description={labels.penaltyFeeDescription}/>
        <Switch onChange={handlePenaltyFeeActive} checked={isActive&& contract.amount > 0} disabled={disabled} />
      </div>
      <div
        className={`jur-contract-set-penalty-fee__values ${
          isActive && !disabled && contract.amount > 0 ? "jur-contract-set-penalty-fee__values--active" : ""
        }`}
      >
        {[from, to].map((counterparty, index) => (contract.penaltyFee ?
          <PriceRange
            key={index}
            min={0}
            defaultValue={(Number(contract.penaltyFee[counterparty.label]) <= contract.amount) ?
              contract.penaltyFee && Number(contract.penaltyFee[counterparty.label]) : contract.amount
            }
            max={Number(contract.amount)}
            address={counterparty.wallet.toLowerCase()}
            onChange={(value) => onPriceChange(counterparty, ethToStore(value))}
          /> : null
        ))}
      </div>
    </div>
  );
};
