import React from 'react';
import PropTypes from 'prop-types';

import Amount from '../Amount';
import Avatar from '../Avatar';
import './UserPreview.scss';


export const UserPreview = ({ name, seed, shouldRenderName, balance, currency }) => {
  return (
    <div className="jur-user-preview">
      <div className="jur-user-preview__item jur-user-preview__info">
        <Avatar seed={ seed } size="medium" variant="circle" />
        <div className="jur-user-preview__info__details">
          {shouldRenderName && !!name ?
            <span className="jur-user-preview__info__name">{ name }</span>  
          : null}
          <span className="jur-user-preview__info__seed">{ seed }</span>
        </div>
      </div>
      <div className="jur-user-preview__item jur-user-preview__balance">
        <span className="jur-user-preview__balance__title">{ currency.toLowerCase() } Balance:</span>
        <Amount value={ balance } className="jur-user-preview__balance__value" />
      </div>
    </div>
  )
};

UserPreview.propTypes = {
  name: PropTypes.string,
  seed: PropTypes.string.isRequired,
  shouldRenderName: PropTypes.bool,
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string
};

UserPreview.defaultProps = {
  currency: 'JUR'
};