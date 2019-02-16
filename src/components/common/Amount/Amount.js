import React from 'react';
import { toCurrencyFormat } from '../../../utils/helpers';

import './Amount.scss';

export const Amount = ({ value, currency }) => {
  const currencyFallback = 'JUR';

  return (
    <span class="jur-amount">
      { `${toCurrencyFormat(value)} ${currency ? currency.toUpperCase() : currencyFallback}` }
    </span>
  )
};