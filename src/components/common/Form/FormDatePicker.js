import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import Form from "./";

import "react-datepicker/dist/react-datepicker.css";

export const FormDatePicker = props => {
  const { selectedDate, error, errorMsg, onChange } = props;
  return (
    <>
      <DatePicker
        className={`${error ? "error" : ""}`}
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
      />
      {error && errorMsg && <Form.ErrorMsg msg={errorMsg} />}
    </>
  );
};