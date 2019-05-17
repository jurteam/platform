import React from "react";
export const FormContainer = ( props ) => {
  const { children, className } = props;
  return (
    <div className={`jur-form__container ${className || ""}`}>{children}</div>
  );
};
