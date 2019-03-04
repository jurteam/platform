import React from 'react';
import PropTypes from 'prop-types';

import './ContractActions.scss';

export const ContractActions = ({children, statusId}) => (
  <div className="jur-contract-actions">
    {statusId === 31 ? // open dispute
      <span className="jur-contract-actions__text">Waiting for Counterparty</span>
      : <>{children}</>
    }
  </div>
)
