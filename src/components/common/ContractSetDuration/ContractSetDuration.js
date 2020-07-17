import React, { useState, useContext } from "react";

import Form from "../Form";
import BlockTitle from "../BlockTitle";

import "./ContractSetDuration.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractSetDuration = ( props ) => {
  const { savedValue, contract, onChange, hasError, disabled } = props;
  const [duration, setDuration] = useState(
    savedValue || contract.duration || { days: 0, hours: 0, minutes: 0 }
  );

  const handleChange = (name, value) => {
    const newValue = { ...duration, [name]: value.toString() };
    setDuration(newValue);
    onChange(newValue);
  };

  const handleConversion =  (number) => {
    if(number !== 0) {
      return parseInt(number)
    } else {
      return 0
    }
  }

  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-set-duration">
      <div className="jur-contract-set-duration__title">{`${labels.duration}:`}</div>
      <BlockTitle title={labels.durationDescription} />
      <div className="jur-contract-set-duration__inputs">
        <Form.NumericInput
          label="days"
          initialValue={handleConversion(contract.duration.days) || 0}
          onChange={handleChange.bind(this, "days")}
          max={999}
          error={hasError("duration")}
          maxLength={3}
          disabled={disabled}
        />
        <Form.NumericInput
          label="hours"
          initialValue={handleConversion(contract.duration.hours) || 0}
          onChange={handleChange.bind(this, "hours")}
          max={23}
          error={hasError("duration")}
          maxLength={2}
          disabled={disabled}
        />
        <Form.NumericInput
          label="minutes"
          initialValue={handleConversion(contract.duration.minutes) || 0}
          onChange={handleChange.bind(this, "minutes")}
          step={15}
          error={hasError("duration")}
          max={45}
          maxLength={2}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
