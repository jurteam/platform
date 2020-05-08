import React from "react";

import Form from "../Form";
import { CalendarIcon } from "../Icons/CalendarIcon";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import { capitalize } from "../../../utils/helpers";
import "./CalendarFilter.scss";

export const CalendarFilter = ({
  selectedDate,
  onChange,
  name,
  className,
  ...rest
}) => (
  <div className={`jur-calendar-filter ${className}`}>
    <Form.DatePicker
      selectedDate={selectedDate}
      onChange={onChange}
      maxDate={new Date()}
      {...rest}
    />
    {!selectedDate && (
      <div className="jur-calendar-filter__placeholder">
        <CalendarIcon className="calendar-icon" />
        {capitalize(name)}
        <CaretDownIcon className="caret-icon" />
      </div>
    )}
  </div>
);
