import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag';

import './ContractName.scss';

export const ContractName = ({ contractName, statusId, statusIdLabel, onContractNameChange }) => (
  <div className="jur-contract-name">
    <input
      type="text"
      value={contractName || ''}
      onChange={onContractNameChange}
    />
    <Tag statusId={statusId}>
      {statusIdLabel}
    </Tag>
  </div>
);
