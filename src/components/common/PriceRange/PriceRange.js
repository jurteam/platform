import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import InputRange from "../InputRange";
import Amount from "../Amount";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./PriceRange.scss";

export const PriceRange = ({ min, max, address, defaultValue, onChange }) => {
  const [value, setValue] = useState(Number(defaultValue));

  const onValueChange = value => {
    setValue(Number(value));
    onChange(value <= max ? Number(value) : max);
  };

  const { labels } = useContext(AppContext);

  const percentageCalc = value => {
    return value > 0
      ? value <= max
        ? parseFloat((value * 100) / max).toFixed(2)
        : parseFloat(100).toFixed(2)
      : parseFloat(0).toFixed(2);
  };
  return (
    <div className="jur-price-range">
      <Avatar seed={address} variant="circle" size="small" />
      <InputRange
        min={min}
        max={max}
        defaultValue={value <= max ? value : max}
        onValueChange={onValueChange}
      />
      <div className="jur-price-range__value">
        <Amount value={value <= max ? value : max} />
        <span className="jur-price-range__value__percentage">
          {" "}
          {percentageCalc(value)} {labels.percentageOfValue}
        </span>
      </div>
    </div>
  );
};
