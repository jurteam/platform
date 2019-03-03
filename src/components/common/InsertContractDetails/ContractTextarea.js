import React from 'react';
import PropTypes from 'prop-types';
import BlockTitle from '../BlockTitle';

import './ContractTextarea.scss';

export const ContractTextarea = ({initialValue, onChange, name, label}) => (
  <div className="jur-contract-textarea">
    <BlockTitle title={label} hideIcon />
    <textarea name={name} value={initialValue} onChange={ev => onChange(ev)} />
  </div>
);