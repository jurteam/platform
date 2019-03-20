import React, { useState } from "react";
import PropTypes from "prop-types";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import { CaretUpIcon } from "../Icons/CaretUpIcon";
import { toCurrencyFormat } from "../../../utils/helpers";
import Form from "./";

export const FormNumericInput = ({
  label,
  initialValue,
  onChange,
  step,
  error,
  errorMsg
}) => {
  const [value, setValue] = useState(
    typeof initialValue === "number" ? initialValue : ""
  );
  const plusOne = () => {
    const newValue = Number(value) + 1;
    setValue(newValue);
    onChange(newValue);
  };
  const minusOne = () => {
    const newValue = Number(value) === 0 ? "" : Number(value) - 1;
    setValue(newValue);
    onChange(newValue);
  };
  const handleChange = value => {
    if (typeof value === "number") {
      onChange(value);
      return;
    }
    const newValue = value.target.value;
    onChange(newValue);
    setValue(newValue);
  };

  return (
    <div
      className={`jur-form__numeric-input ${
        error ? "jur-form__numeric-input--error" : ""
      }`}
    >
      <div className="jur-form__numeric-input__wrapper">
        <div>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            step={step || "any"}
            pattern="^\d*(\.\d{0,2})?$"
          />
          <label>{label}</label>
        </div>
        <div className="jur-form__numeric-input__actions">
          <CaretUpIcon onClick={plusOne} />
          <CaretDownIcon onClick={minusOne} />
        </div>
      </div>
      {errorMsg && <Form.ErrorMsg msg={errorMsg} />}
    </div>
  );
};
