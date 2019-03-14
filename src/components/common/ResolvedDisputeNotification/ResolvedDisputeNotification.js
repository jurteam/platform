import React from 'react';
import PropTypes from 'prop-types';
import {HourGlassIcon} from '../Icons/HourGlassIcon';

import './ResolvedDisputeNotification.scss';

export const ResolvedDisputeNotification = props => (
  <div className="jur-resolved-dispute-notification" {...props}>
    <HourGlassIcon /> <strong>The dispute was resolved in 24h</strong>. Thank you for voting!
  </div>
);
