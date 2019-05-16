import React from "react";
import PropTypes from "prop-types";

import "./UserActionFooter.scss";

export const UserActionFooter = props => {
  const { children, className } = props;
  return (<div className={`jur-user-action__footer ${className || ""}`}>{children}</div>);
};
