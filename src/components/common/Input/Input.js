import React from "react";


export const Input = ( props ) => {
  const { label, required, id, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required ? <sup>*</sup> : <span>(Optional)</span>}
      </label>
      <input {...rest} id={id} required />
    </div>
  );
};
