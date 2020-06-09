import React from "react";
import "./AmountFilter.scss";

import Form from "JurCommon/Form";
import { JurIcon } from "JurCommon/Icons";

const AmountFilter = ({ value, onChange, name, className }) => (
  <div className={`jur-amount-filter ${className}`}>
    <Form.NumericInput value={value ? value : ""} onChange={onChange} />
    {!value && (
      <div className="jur-amount-filter__placeholder">
        <JurIcon className="icon-half" />
        {name}
      </div>
    )}
  </div>
);

export default AmountFilter;
