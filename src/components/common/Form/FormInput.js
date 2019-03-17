import React from 'react';
import {Form} from './Form';

export const FormInput = ({className, error, errorMsg, ...rest}) => (
  <>
    <input className={`${className} ${error ? 'error':''}`} {...rest}  />
    {error && errorMsg && <Form.ErrorMsg msg={errorMsg} /> }
  </>
);