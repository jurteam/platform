import React from "react";
import PropTypes from "prop-types";

import "./UserActionBody.scss";

export const UserActionBody = ({ children, className, dangerouslySetInnerHTML }) => (
  <div className={`jur-user-action__body ${className || ""}`} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>{children}</div>
);
