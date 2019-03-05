import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './InputRange.scss';

export const InputRange = ({ min, max, defaultValue, onValueChange, step }) => {
  const calculateSpanWidth = (value) => {
    const width = 100 - (Number(value) * 100) / Number(max);
    console.log(parseFloat(width).toFixed(2));
    return parseFloat(width).toFixed(2) + '%';
  };

  const [value, setValue] = useState(defaultValue);
  const [spanWidth, setSpanWidth] = useState(defaultValue ? calculateSpanWidth(defaultValue) : '100%');

  const onChange = ev => {
    const value = ev.target.value;
    setValue(value);
    setSpanWidth(calculateSpanWidth(value));
    onValueChange(value);
  };

  return (
    <div className="jur-range">
      <span style={{width: spanWidth}}></span>
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
