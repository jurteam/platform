import React from 'react'
export const FormTextArea = ({onChange, ...props}) => {
  const handleChange = ev => onChange(ev.target.value);
  return <textarea {...props} onChange={handleChange} />
};