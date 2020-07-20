import React from "react";
import "./OathTakerAmountFilter.scss";

import AmountFilter from "JurCommon/AmountFilter";
import Separator from "JurCommon/Separator";
import { MIN_TOKEN_AMOUNT } from "../../../../api/connex/OathKeeper";


const OathTakerAmountFilter = ({ onChange, minAmount, maxAmount }) => (
  <>
    <AmountFilter
      name="Min"
      min={MIN_TOKEN_AMOUNT}
      value={minAmount}
      onChange={minAmount => onChange(minAmount, maxAmount)}
    />
    <Separator />
    <AmountFilter
      name="Max"
      min={MIN_TOKEN_AMOUNT}
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
