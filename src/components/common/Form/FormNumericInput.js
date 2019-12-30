import React, { useState } from "react";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import { CaretUpIcon } from "../Icons/CaretUpIcon";
import Form from "./";
import { log } from "../../../utils/helpers";

export const FormNumericInput = ( props ) => {
  const {
    label,
    initialValue,
    onChange,
    step,
    error,
    errorMsg,
    ...params
  } = props;
  const [value, setValue] = useState(
    typeof initialValue === "number" ? initialValue : '0.01'
  );
  const plus = () => {
    if (!params.disabled) {

      const newValue = controlValue(Number(value) + (step || 1));
      
      setValue(newValue);
      onChange(newValue);
    }
  };
  const minus = () => {

    if (!params.disabled) {

      const newValue = controlValue(Number(value) - (step || 1))

      setValue(newValue);
      onChange(newValue);
    }
  };
  const handleChange = ( val ) => {
    
    
    if (typeof val === "number") {
      val = controlValue(val)
      onChange(val);
      return;
    }
    log('FormNumericInput - handleChange',val.target.value)
    const newValue = controlValue(val.target.value);
    log('FormNumericInput - newValue',newValue)
    onChange(newValue);
    setValue(newValue);
    return;
  };

  const controlValue = (val) => {
    const { min,max} = params;
    
    log('FormNumericInput - controlValue',val)

    val = Number(val)
    
    // control min
    let minVal = typeof min === "number" ? min : 0    
    val = Number(val) < minVal ? minVal : val;
    
    // control max
    val = typeof max === "number" && Number(val) > max ? max : val;

    // control step
    // let stepVal = typeof step === "number" ? step : 1;
    // log('FormNumericInput - stepVal', stepVal)
    // val = val % stepVal > 0 ? val - (val % stepVal) : val
    // log('FormNumericInput - val % stepVal',val % stepVal)

    val = step === 0.01 ? Number.parseFloat(val).toFixed(2) : Number(val)

    log('FormNumericInput [5] controlValue',val)
    return val

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
            value={''+value}
            onChange={handleChange}
            onScroll={handleChange}
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
