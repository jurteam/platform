import React from 'react';
import PropTypes from 'prop-types';

import { toCurrencyFormat } from '../../../utils/helpers';

import './Amount.scss';

export const Amount = ({ value, currency }) => {
  return (
    <span class="jur-amount">
      { `${toCurrencyFormat(value)} ${currency.toUpperCase()}` }
    </span>
  )
};

Amount.PropTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string
};

Amount.defaultProps = {
  currency: 'JUR'
};
