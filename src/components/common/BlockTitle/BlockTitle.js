import React from "react";
import PropTypes from "prop-types";
import InfoTooltip from "../InfoTooltip";

import "./BlockTitle.scss";

export const BlockTitle = props => {
  const {
    title,
    description,
    tooltipPosition,
    hideIcon,
    ...rest
  } = props;
  return (
    <div className="jur-block-title" {...rest}>
      {!hideIcon && <InfoTooltip text={description} position={tooltipPosition} />}
      <span>{title}</span>
    </div>
  );
};

BlockTitle.defaultProps = {
  hideIcon: false
};
