import React from 'react'
export const FormLabel = ({children, optional, required, ...rest}) => (
  <label {...rest}>
    {children} {optional && <span>(Optional)</span>} {required && <sup>*</sup>}
  </label>
);