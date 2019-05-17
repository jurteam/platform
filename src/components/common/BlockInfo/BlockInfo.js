import React from "react";

import { InfoIcon } from "../Icons/InfoIcon";

import "./BlockInfo.scss";

export const BlockInfo = ( props ) => (
  <div className="jur-block-info">
    <InfoIcon />
    <span>
      {props.title && <strong>{props.title}: </strong>}
      <span>{props.description}</span>
    </span>
  </div>
);
