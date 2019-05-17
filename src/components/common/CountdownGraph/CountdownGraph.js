import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Countdown from "../Countdown";
import BlockTitle from "../BlockTitle";

import "./CountdownGraph.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const CountdownGraph = ( props ) => {
  const {
    onProgress,
    message,
    showMessage,
    ...rest
  } = props;
  const [percentage, setPercentage] = useState(0);
  const progressHandler = percentage => {
    setPercentage(percentage);
    if ( typeof onProgress === "function") onProgress(percentage);
  };
  const { labels } = useContext(AppContext);

  const getMessage = () => {
    switch (rest.statusId) {
      case -1: // rejected
        return (
          <span className="rejected">
            {labels.contractWasRejected}
          </span>
        );
      case 0: // draft
      case 1: // waiting for counterparty
      case 2: // waiting for payment
        return (
          <span className="before-start">
            <BlockTitle title={labels.startingDateInfo} description={labels.startingDateInfoDescription}/>
          </span>
        );
      case 5: // onGoing
        break;
      case 8: // expired rosso
        break;
      case 9: // contract closed
      case 21: // open friendly resolution
      case 29: // closed friendly resolution
      case 31: // Open dispute
        break;
      case 35: // onGoing dispute 24h
        break;
      case 36: // extended Dispute 30min
        break;
      case 38: // expired dispute
        return (
          <BlockTitle
            style={{ textTransform: "uppercase" }}
            title="the dispute is expired"
            hideIcon
          />
        );
      case 39: // dispute closed
        break;
      default:
    }
  };
  return (
    <div className="jur-countdown-graph">
      <div className="jur-countdown-graph__wrapper">
        <svg viewBox="0 0 36 36">
          <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(0)">
              <stop offset="0%" stopColor="#00B6F2" />
              <stop offset="100%" stopColor="#00E0B7" />
            </linearGradient>
          </defs>
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#D8D8D8"
            strokeWidth="3"
            strokeDasharray="100, 100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url('#myGradient')"
            strokeWidth="3"
            strokeDasharray={`${percentage.toString().replace("%", "")}, 100`}
          />
        </svg>
        <Countdown {...rest} onProgress={progressHandler} />
      </div>
      {showMessage && (
        <div className="jur-countdown-graph__message">{getMessage()}</div>
      )}
    </div>
  );
};
