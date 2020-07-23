import React from "react";
import DatePicker from "react-datepicker";
import Form from "./";

import "react-datepicker/dist/react-datepicker.css";

export const FormDatePicker = props => {
  const {
    selectedDate,
    error,
    errorMsg,
    onChange,
    isClearable,
    ...rest
  } = props;
  return (
    <>
      <DatePicker
        className={`${error ? "error" : ""}`}
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        isClearable={isClearable}
        {...rest}
      />
      {error && errorMsg && <Form.ErrorMsg msg={errorMsg} />}
    </>
  );
};

FormDatePicker.defaultProps = {
  isClearable: true
};
