import React from "react";

import BlockTitle from "../BlockTitle";

import "./ContractTextarea.scss";

export const ContractTextarea = ( props ) => {
  const {
    initialValue,
    onChange,
    name,
    label,
    error,
    placeholder,
    ...rest
  } = props;
  return (
    <div
      className={`jur-contract-textarea ${
        error ? "jur-contract-textarea__error" : null
      }`}
    >
      <BlockTitle title={label} hideIcon />
      <textarea
        placeholder={placeholder || ""}
        name={name}
        className={rest.disabled ? "jur-contract-textarea__disabled" : ""}
        value={initialValue}
        onChange={(ev) => onChange(ev)}
        {...rest}
      />
    </div>
  );
};
