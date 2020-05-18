import React from "react";
import "./OathTakerAmountFilter.scss";

import AmountFilter from "JurCommon/AmountFilter";
import Separator from "JurCommon/Separator";

const OathTakerAmountFilter = ({ onChange, minAmount, maxAmount }) => (
  <>
    <AmountFilter
      name="Min"
      value={minAmount}
      onChange={minAmount => onChange(minAmount, maxAmount)}
    />
    <Separator />
    <AmountFilter
      name="Max"
      value={maxAmount}
      onChange={maxAmount => onChange(minAmount, maxAmount)}
      className="jur-oath-taker-amount-filter-max"
    />
  </>
);

const mapStateToProps = state => ({
  minAmount: state.oathKeeper.oathTakersFilters.minAmount,
  maxAmount: state.oathKeeper.oathTakersFilters.maxAmount
});

export default global.connection(OathTakerAmountFilter, mapStateToProps);
