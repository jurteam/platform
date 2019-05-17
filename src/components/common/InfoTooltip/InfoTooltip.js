import React from "react";

import ReactTooltip from 'react-tooltip'
import { InfoIcon } from "../Icons/InfoIcon";
import "./InfoTooltip.scss";

export const InfoTooltip = ( props ) => {
  const { text, position } = props;
  const dataAttrs = {
    "data-tip": text
  };

  return (
    <div
      className="jur-info-tooltip"
      {...!!text && dataAttrs}
    >
      <InfoIcon />
      <ReactTooltip
        className="jur-info-tooltip__tool-tip"
        place={position}
        type="dark"
        effect="solid"
      />
    </div>
  );
};
