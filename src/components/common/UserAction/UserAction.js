import React from "react";
import PropTypes from "prop-types";

import "./UserAction.scss";

export const UserAction = ( props ) => {
  const { children, className } = props;
  return <div className={`jur-user-action ${className || ""}`}>{children}</div>;
};

UserAction.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
