import React, { useContext } from "react";


import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ContractSetCaseDispute.scss";

export const ContractSetCaseDispute = ( props ) => {
  const { cases, selectedOptionId, handleChange, disabled } = props;

  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-set-case-dispute">
      <div className="jur-contract-set-case-dispute__title">
        {labels.inCaseOfDispute}
      </div>
      <div
        className={`jur-contract-set-case-dispute__options ${
          disabled ? "jur-contract-set-case-dispute__disabled" : ""
        }`}
      >
        {cases.map((option, index) => (
          <div
            key={index.toString()}
            className="jur-contract-set-case-dispute__option"
          >
            <input
              type="radio"
              name="contact-set-case"
              id={`jur-contract-set-case-dispute__case-${option.id}`}
              checked={option.id === selectedOptionId}
              disabled={option.disabled || false}
              onChange={handleChange.bind(this, option.id)}
            />
            <label htmlFor={`jur-contract-set-case-dispute__case-${option.id}`}>
              {option.label}
            </label>
            <div className="jur-contract-set-case-dispute__option-description">
              {option.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
