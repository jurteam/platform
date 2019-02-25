import React from 'react';
import PropTypes from 'prop-types';
import {InfoIcon} from '../Icons/InfoIcon';
import './InfoTooltip.scss';

export const InfoTooltip = ({ text, position }) => {
  const dataAttrs = {
    'data-tooltip': text
  };

  return (
    <div
      className={`jur-info-tooltip ${position ? `jur-info-tooltip--${position}` : 'jur-info-tooltip--left'}`}
      {...(!!text && dataAttrs)}
    >
      <InfoIcon />
    </div>  
  )
};