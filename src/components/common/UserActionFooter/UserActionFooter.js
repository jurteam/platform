import React from 'react'
import PropTypes from 'prop-types';

import './UserActionFooter.scss';

export const UserActionFooter = ({ children, className }) => (
  <div className={`jur-user-action__footer ${className || ''}`}>
    { children }
  </div>
);