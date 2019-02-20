import React from 'react';
import PropTypes from 'prop-types';

import './CounterpartiesInfo.scss';

export const CounterpartiesInfo = ({ title, description }) => (
  <div className="jur-counterparties-info">
    <h2>{ title }</h2>
    <p>{ description }</p>
  </div>
);