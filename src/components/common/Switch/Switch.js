import React, {useState} from 'react';
import './Switch.scss';

export const Switch = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const handleChange = ev => {
    const newValue = ev.target.checked;
    setChecked(newValue);
    props.onChange(ev);
  };

  return (
    <div className="switch">
      <label className="switch__input">
          <input type="checkbox" { ...props } onChange={handleChange} />
          <span className="slider"></span>
      </label>
      <div className="switch__value">{checked ? 'Yes': 'No'}</div>
    </div>
  );
};