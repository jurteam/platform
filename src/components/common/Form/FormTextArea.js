import React from "react";
export const FormTextArea = ( props ) => {
  const { onChange, ...rest } = props;
  const handleChange = ev => onChange(ev.target.value);
  return <textarea {...rest} onChange={handleChange} />;
};
