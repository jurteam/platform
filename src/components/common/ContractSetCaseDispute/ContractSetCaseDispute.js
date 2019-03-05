import React from 'react';
import PropTypes from 'prop-types';

import './ContractSetCaseDispute.scss';

export const ContractSetCaseDispute = ({cases, selectedOptionId, handleChange}) => {

  return (
    <div className="jur-contract-set-case-dispute">
      <div className="jur-contract-set-case-dispute__title">In Case of Dispute</div>
      <div className="jur-contract-set-case-dispute__options">
        {cases.map((option, index) => (
          <div key={index.toString()} className="jur-contract-set-case-dispute__option">
            <input
              type="radio"
              name="contact-set-case" id={`jur-contract-set-case-dispute__case-${option.id}`}
              checked={selectedOptionId === option.id}
              onChange={handleChange.bind(this, option.id)}
            />
            <label htmlFor={`jur-contract-set-case-dispute__case-${option.id}`}>{option.label}</label>
            <div className="jur-contract-set-case-dispute__option-description">
              {option.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
