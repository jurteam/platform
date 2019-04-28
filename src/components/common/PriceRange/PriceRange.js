import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import InputRange from "../InputRange";
import Amount from "../Amount";

import "./PriceRange.scss";

export const PriceRange = props => {
  const {
    min,
    max,
    address,
    defaultValue,
    onChange
  } = props;
  const [value, setValue] = useState(defaultValue || 0);
  const onValueChange = value => {
    setValue(value);
    onChange(value);
  };

  const percentageCalc = value => {
    return parseFloat((value * 100) / max).toFixed(2);
  };
  return (
    <div className="jur-price-range">
      <Avatar seed={address} variant="circle" size="small" />
      <InputRange
        min={min}
        max={max}
        defaultValue={value}
        onValueChange={onValueChange}
      />
      <div className="jur-price-range__value">
        <Amount value={value} />
        <span className="jur-price-range__value__percentage">
          {" "}
          {percentageCalc(value)} % of value
        </span>
      </div>
    </div>
  );
};
