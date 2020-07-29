import React from "react";
import "./OathTakerAmountFilter.scss";

import AmountFilter from "JurCommon/AmountFilter";
import Separator from "JurCommon/Separator";
import { MIN_TOKEN_AMOUNT } from "../../../../api/connex/OathKeeper";
import { getLabels } from "../../../../sagas/Selectors";

const OathTakerAmountFilter = ({ onChange, minAmount, maxAmount, labels }) => (
  <>
    <AmountFilter
      name={labels.min}
      min={MIN_TOKEN_AMOUNT}
      value={minAmount}
      onChange={minAmount => onChange(minAmount, maxAmount)}
    />
    <Separator />
    <AmountFilter
      name={labels.max}
      min={MIN_TOKEN_AMOUNT}
      value={maxAmount}
      onChange={maxAmount => onChange(minAmount, maxAmount)}
      className="jur-oath-taker-amount-filter-max"
    />
  </>
);

const mapStateToProps = state => ({
  minAmount: state.oathKeeper.oathTakersFilters.minAmount,
  maxAmount: state.oathKeeper.oathTakersFilters.maxAmount,
  labels: getLabels(state)
});

export default global.connection(OathTakerAmountFilter, mapStateToProps);
