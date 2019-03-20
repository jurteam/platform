import React from "react";

export const FormGroup = ({ children, className }) => (
  <div className={`jur-form__group ${className || ""}`}>{children}</div>
);
