import React from 'react';
import PropTypes from 'prop-types';
import InfoTooltip from '../InfoTooltip';

import './BlockTitle.scss';

export const BlockTitle = ({ title, description, tooltipPosition }) => (
  <div className="jur-block-title">
    <InfoTooltip
      text={description}
      position={tooltipPosition}
    />
    <span>{title}</span>
  </div>
);
