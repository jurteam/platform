import React from "react";

export const FormGroup = ( props ) => {
  const { children, className } = props;
  return (
    <div className={`jur-form__group ${className || ""}`}>{children}</div>
  );
};
