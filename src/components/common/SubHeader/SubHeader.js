import React from 'react';
import PropTypes from 'prop-types';

import './SubHeader.scss';

export const SubHeader = ({children}) => (
  <div className="jur-sub-header">
    {children}
  </div>
);
