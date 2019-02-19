import React from 'react'
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

import './AvatarInfo.scss';

export const AvatarInfo = ({ userName, userWallet, renderName, variant }) => (
  <div className={`jur-avatar-info ${variant ? `jur-avatar-info--${variant}` : ''}`}>
    <Avatar seed={ userWallet } size="xsmall" />
    <div className="jur-avatar-info__text">
      { renderName && userName ?
          userName
        : userWallet
      }
    </div>
  </div>
);