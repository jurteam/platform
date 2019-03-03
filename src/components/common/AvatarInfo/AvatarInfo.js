import React from 'react'
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

import './AvatarInfo.scss';

export const AvatarInfo = ({ userName, userWallet, renderName, variant, maxTextWidth }) => (
  <div className={`jur-avatar-info ${variant ? `jur-avatar-info--${variant}` : ''}`}>
    <Avatar seed={ userWallet } size="xsmall" />
    <div className="jur-avatar-info__text" style={{width: maxTextWidth || 150}}>
      { renderName && userName ?
          userName
        : userWallet
      }
    </div>
  </div>
);