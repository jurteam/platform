import React from "react";
export const FormLabel = ( props ) => {
  const { children, optional, required, ...rest } = props;
  return (
    <label {...rest}>
      {children} {optional && <span className="optional">(Optional)</span>}{" "}
      {required && <span className="required">*</span>}
    </label>
  );
};