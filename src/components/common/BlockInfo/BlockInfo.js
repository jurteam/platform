import React from "react";
import PropTypes from "prop-types";
import { InfoIcon } from "../Icons/InfoIcon";

import "./BlockInfo.scss";

export const BlockInfo = ({ title, description }) => (
  <div className="jur-block-info">
    <InfoIcon />
    <span>
      {title && <strong>{title}: </strong>}
      <span>{description}</span>
    </span>
  </div>
);
