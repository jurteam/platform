import React, { useState, useEffect } from "react";

import "./InputRange.scss";

export const InputRange = props => {
  const { min, max, defaultValue, onValueChange, step } = props;
  const calculateSpanWidth = value => {
    if (max === 0 || value === 0) {
      return "100%";
    } else if (value && value <= max) {
      const width = 100 - (Number(value) * 100) / Number(max);
      return parseFloat(width).toFixed(2) + "%";
    }
    return "0%";
  };

  const [value, setValue] = useState(defaultValue || 0);
  const [spanWidth, setSpanWidth] = useState(
    defaultValue ? calculateSpanWidth(defaultValue) : "0%"
  );

  useEffect(() => setSpanWidth(calculateSpanWidth(value)), [max]);

  const onMove = ev => {
    const value = ev.target.value;
    setValue(value);
    setSpanWidth(calculateSpanWidth(value));
  };

  const onMouseUp = ev => {
    const value = ev.target.value;
    onValueChange(value);
  };

  return (
    <div className="jur-range">
      <span style={{ width: spanWidth }} />
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={onMove}
        onMouseUp={onMouseUp}
      />
    </div>
  );
};
