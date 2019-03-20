import React from "react";
import PropTypes from "prop-types";
import InfoTooltip from "../InfoTooltip";

import "./BlockTitle.scss";

export const BlockTitle = ({
  title,
  description,
  tooltipPosition,
  hideIcon,
  ...rest
}) => (
  <div className="jur-block-title" {...rest}>
    {!hideIcon && <InfoTooltip text={description} position={tooltipPosition} />}
    <span>{title}</span>
  </div>
);

BlockTitle.defaultProps = {
  hideIcon: false
};
