import React from "react";

import InfoTooltip from "../InfoTooltip";

import "./BlockTitle.scss";

export const BlockTitle = props => {
  const {
    title,
    description,
    tooltipPosition,
    hideIcon,
    reverse,
    ...rest
  } = props;
  return (
    <div
      className={`jur-block-title ${reverse ? "jur-block-title__reverse" : ""}`}
      {...rest}
    >
      {!hideIcon && (
        <InfoTooltip text={description} position={tooltipPosition} />
      )}
      <span className="jur-block-title__title">{title}</span>
    </div>
  );
};

BlockTitle.defaultProps = {
  hideIcon: false
};
