import React from "react";
import PropTypes from "prop-types";
import UserAction from "../UserAction";

import "./MetaMastWrapper.scss";

export const MetaMaskWrapper = props => {
  const { className, children } = props;
  return (
    <div className={`jur-metamask-wrapper ${className || ""}`}>
      <div className="jur-metamask-wrapper__container">{children}</div>
    </div>
  );
};
