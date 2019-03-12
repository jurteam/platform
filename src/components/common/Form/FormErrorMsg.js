import React from 'react';
import {AlertIcon} from '../Icons/AlertIcon';

export const FormErrorMsg = ({msg}) => (
  <span className="jur-form__error-msg">
    <AlertIcon /> {msg}
  </span>
);