import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import BlockTitle from "../BlockTitle";

import "./ContractSetDuration.scss";

export const ContractSetDuration = ({ savedValue, onChange }) => {
  const [duration, setDuration] = useState(
    savedValue || { days: 0, hours: 0, minutes: 0 }
  );

  const handleChange = (name, value) => {
    const newValue = { ...duration, [name]: value };
    setDuration(newValue);
    onChange(newValue);
  };

  return (
    <div className="jur-contract-set-duration">
      <div className="jur-contract-set-duration__title">Duration:</div>
      <BlockTitle title="The starting date is when the counterparty accepts. 30 days max" />
      <div className="jur-contract-set-duration__inputs">
        <Form.NumericInput
          label="days"
          value={duration.days}
          onChange={handleChange.bind(this, "days")}
        />
        <Form.NumericInput
          label="hours"
          value={duration.hours}
          onChange={handleChange.bind(this, "hours")}
        />
        <Form.NumericInput
          label="minutes"
          value={duration.minutes}
          onChange={handleChange.bind(this, "minutes")}
        />
      </div>
    </div>
  );
};
