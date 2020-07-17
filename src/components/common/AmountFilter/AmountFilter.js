import React from "react";
import "./AmountFilter.scss";

import Form from "JurCommon/Form";
import { JurIcon } from "JurCommon/Icons";

const AmountFilter = ({
  value,
  onChange,
  name,
  className = "",
  hideActions = true
}) => (
  <div className={`jur-amount-filter ${className}`}>
    <Form.NumericInput
      value={value ? value : ""}
      onChange={onChange}
      hideActions={hideActions}
    />
    {!value && (
      <div className="jur-amount-filter__placeholder">
        <JurIcon className="icon-half" circle={true} />
        <span className="jur-amount-filter__placeholder-label">{name}</span>
      </div>
    )}
  </div>
);

export default AmountFilter;
