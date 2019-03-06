import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const FormDatePicker = ({selectedDate, onChange}) => (
  <DatePicker
    selected={selectedDate}
    onChange={onChange}
    dateFormat="dd/MM/yyyy"
  />
);
