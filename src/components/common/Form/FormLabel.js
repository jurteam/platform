import React from "react";
export const FormLabel = ({ children, optional, required, ...rest }) => (
  <label {...rest}>
    {children} {optional && <span className="optional">(Optional)</span>}{" "}
    {required && <span className="required">*</span>}
  </label>
);
