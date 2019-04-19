import React from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";

import "./ContractTextarea.scss";

export const ContractTextarea = ({
  initialValue,
  onChange,
  name,
  label,
  error,
  placeholder,
  ...rest
}) => (
  <div className={`jur-contract-textarea ${error ? "jur-contract-textarea__error": null}`}>
    <BlockTitle title={label} hideIcon />
    <textarea
      placeholder={placeholder || ""}
      name={name}
      className={rest.disabled ? "jur-contract-textarea__disabled" : ""}
      value={initialValue}
      onChange={ev => onChange(ev)}
      {...rest}
    />
  </div>
);
