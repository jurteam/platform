import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { AlertIcon } from "../Icons/AlertIcon";

import "./UserAction.scss";

export const UserAction = ({ children, className }) => {
  return <div className={`jur-user-action ${className || ""}`}>{children}</div>;
};

UserAction.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
