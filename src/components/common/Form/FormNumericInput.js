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
  errorMsg,
  ...params
}) => {
  const [value, setValue] = useState(
    typeof initialValue === "number" ? initialValue : ""
  );
  const plus = () => {
    if (!params.disabled) {
      const { max } = params;
      const newValue =
        max && Number(value) === max ? max : Number(value) + (step || 1);
      setValue(newValue);
      onChange(newValue);
    }
  };
  const minus = () => {
    if (!params.disabled) {
      const newValue = Number(value) === 0 ? "0" : Number(value) - (step || 1);
      setValue(newValue);
      onChange(newValue);
    }
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
            value={initialValue}
            onChange={handleChange}
            step={step || "any"}
            pattern="^\d*(\.\d{0,2})?$"
            {...params}
          />
          <label>{label}</label>
        </div>
        <div className="jur-form__numeric-input__actions">
          <CaretUpIcon onClick={plus} />
          <CaretDownIcon onClick={minus} />
        </div>
      </div>
      {errorMsg && <Form.ErrorMsg msg={errorMsg} />}
    </div>
  );
};
