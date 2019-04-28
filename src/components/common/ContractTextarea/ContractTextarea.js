import React from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";

import "./ContractTextarea.scss";

export const ContractTextarea = props => {
  const {
    initialValue,
    onChange,
    name,
    label,
    placeholder
  } = props;
  return (
    <div className="jur-contract-textarea">
      <BlockTitle title={label} hideIcon />
      <textarea
        placeholder={placeholder || ""}
        name={name}
        value={initialValue}
        onChange={ev => onChange(ev)}
      />
    </div>
  );
};