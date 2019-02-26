import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Countdown from '../Countdown';

import './CountdownGraph.scss';

export const CountdownGraph = ({ onProgress, message, ...rest }) => {
  const [percentage, setPercentage] = useState(0);
  const progressHandler = (percentage) => {
    setPercentage(percentage);
    onProgress(percentage);
  };
  return (
    <div className="jur-countdown-graph">
      <div className="jur-countdown-graph__wrapper">
        <svg viewBox="0 0 36 36">
          <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(0)">
              <stop offset="0%"  stopColor="#00B6F2" />
              <stop offset="100%" stopColor="#00E0B7" />
            </linearGradient>
          </defs>
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#D8D8D8"
                strokeWidth="3"
                strokeDasharray="100, 100"
          />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url('#myGradient')"
                strokeWidth="3"
                strokeDasharray={`${percentage.toString().replace('%', '')}, 100`}
          />
        </svg>
        <Countdown {...rest} onProgress={progressHandler} />
      </div>
    </div>
  );
};