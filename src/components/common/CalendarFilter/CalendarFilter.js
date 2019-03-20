import React from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import { CalendarIcon } from "../Icons/CalendarIcon";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import { capitalize } from "../../../utils/helpers";
import "./CalendarFilter.scss";

export const CalendarFilter = ({ selectedDate, onChange, name }) => (
  <div className="jur-calendar-filter">
    <Form.DatePicker
      selectedDate={selectedDate}
      onChange={date => onChange(date)}
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
