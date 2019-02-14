import React from 'react';
import PropTypes from 'prop-types';
import { toCurrencyFormat } from '../../../utils/helpers';
import Avatar from '../Avatar';
import './UserPreview.scss';


export const UserPreview = ({ name, seed, shouldRenderName, balance, currency }) => {
  
  return (
    <div className="jur-user-preview">
      <div class="jur-user-preview__item jur-user-preview__info">
        <Avatar seed={ seed } size="medium" variant="circle" />
        <div class="jur-user-preview__info__details">
          {shouldRenderName && !!name ?
            <span class="jur-user-preview__info__name">{ name }</span>  
          : null}
          <span class="jur-user-preview__info__seed">{ seed }</span>
        </div>
      </div>
      <div class="jur-user-preview__item jur-user-preview__balance">
        <span class="jur-user-preview__balance__title">{ currency } Balance:</span>
        <span class="jur-user-preview__balance__value">{ `${toCurrencyFormat(balance)}${currency.toUpperCase()}` }</span>
      </div>
    </div>
  )
};

UserPreview.propTypes = {
  name: PropTypes.string,
  seed: PropTypes.string.isRequired,
  shouldRenderName: PropTypes.bool,
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string.isRequired
};