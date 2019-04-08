import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import BlockTitle from "../BlockTitle";

import "./ContractSetDuration.scss";

export const ContractSetDuration = ({ savedValue, contract, onChange, disabled }) => {
  const [duration, setDuration] = useState(
    savedValue || contract.duration || { days: 0, hours: 0, minutes: 0 }
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
          initialValue={contract.duration.days || 0}
          onChange={handleChange.bind(this, "days")}
          max={999}
          maxLength={3}
          disabled={disabled}
        />
        <Form.NumericInput
          label="hours"
          initialValue={contract.duration.hours || 0}
          onChange={handleChange.bind(this, "hours")}
          max={23}
          maxLength={2}
          disabled={disabled}
        />
        <Form.NumericInput
          label="minutes"
          initialValue={contract.duration.minutes || 0}
          onChange={handleChange.bind(this, "minutes")}
          step={15}
          max={45}
          maxLength={2}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
