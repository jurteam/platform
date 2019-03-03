import React from 'react'
export const FormContainer = ({children, className}) => (
  <div className={`jur-form__container ${className || ''}`}>{children}</div>
);