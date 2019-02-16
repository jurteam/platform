import React from 'react';
import PropTypes from 'prop-types';

import { toCurrencyFormat } from '../../../utils/helpers';

import './Amount.scss';

export const Amount = ({ value, currency, className }) => {
  return (
    <span className={ `jur-amount ${className}`} >
      { `${toCurrencyFormat(value)} ${currency.toUpperCase()}` }
    </span>
  )
};

Amount.PropTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string,
  className: PropTypes.string
};

Amount.defaultProps = {
  currency: 'JUR'
};
