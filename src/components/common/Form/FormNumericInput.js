import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {CaretDownIcon} from '../Icons/CaretDownIcon';
import {CaretUpIcon} from '../Icons/CaretUpIcon';

export const FormNumericInput = ({label, initialValue, onChange}) => {
  const [value, setValue] = useState(initialValue || 0);
  const plusOne = () => setValue(Number(value) + 1);
  const minusOne = () => setValue(Number(value) === 0 ? 0 : Number(value) - 1);
  return (
    <div className="jur-form__numeric-input">
      <div>
        <input type="number" value={value} onChange={ev => onChange(ev.target.value)}/>
        <label>{label}</label>
      </div>
      <div className="jur-form__numeric-input__actions">
        <CaretUpIcon onClick={plusOne} />
        <CaretDownIcon onClick={minusOne} />
      </div>
    </div>
  );
};
