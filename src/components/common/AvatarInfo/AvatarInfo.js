import React from 'react'
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

import './AvatarInfo.scss';

export const AvatarInfo = ({ userName, userWallet, shouldRenderName, type, variant, maxTextWidth, size, ...rest }) => (
  <div
    className={`jur-avatar-info ${variant ? `jur-avatar-info--${variant}` : ''}`}
    {...rest}
  >
    <Avatar seed={ userWallet } size={size} variant={type} />
    <div className="jur-avatar-info__text" style={{width: maxTextWidth || 150}}>
      { shouldRenderName && userName ?
          userName
        : userWallet
      }
    </div>
  </div>
);

AvatarInfo.defaultProps = {
  size: 'xsmall'
}