import React from "react";
import "./OathTakerAmountFilter.scss";

import AmountFilter from "JurCommon/AmountFilter";
import Separator from "JurCommon/Separator";

const OathTakerAmountFilter = () => (
  <>
    <AmountFilter name="Min" />
    <Separator />
    <AmountFilter name="Max" className="jur-oath-taker-amount-filter-max" />
  </>
);

export default OathTakerAmountFilter;
