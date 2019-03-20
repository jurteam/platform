import React from "react";
import PropTypes from "prop-types";

export const Input = ({ label, required, id, ...rest }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label} {required ? <sup>*</sup> : <span>(Optional)</span>}
    </label>
    <input {...rest} id={id} required />
  </div>
);
