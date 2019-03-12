import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Form from './';

import 'react-datepicker/dist/react-datepicker.css';

export const FormDatePicker = ({selectedDate, error, errorMsg, onChange}) => (
  <>
    <DatePicker
      className={`${error ? 'error':''}`}
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
    />
    {errorMsg && <Form.ErrorMsg msg={errorMsg} />}
  </>
);
