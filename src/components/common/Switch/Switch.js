import React from 'react';
import './Switch.scss';

export const Switch = (props) => (
  <label className="switch">
    <input type="checkbox" { ...props }/>
    <span className="slider"></span>
  </label>
);