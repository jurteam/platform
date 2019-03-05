import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './InputRange.scss';

export const InputRange = ({ min, max, defaultValue, onValueChange, step }) => {
  const [value, setValue] = useState(defaultValue);
  const [spanWidth, setSpanWidth] = useState('100%');

  const calculateSpanWidth = (target) => {
    const width = 100 - (Number(target.value) * 100) / Number(target.max);
    console.log(parseFloat(width).toFixed(2));
    return parseFloat(width).toFixed(2) + '%';
  };

  const onChange = ev => {
    const value = ev.target.value;
    setValue(value);
    setSpanWidth(calculateSpanWidth(ev.target));
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
