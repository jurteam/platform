import React from "react";
import PropTypes from "prop-types";
import { AlertIcon } from "../Icons/AlertIcon";

import "./UserActionHeader.scss";

export const UserActionHeader = ({ children, className, variant }) => (
  <div
    className={`jur-user-action__header ${
      variant ? `jur-user-action__header--${variant}` : ""
    } ${className || ""}`}
  >
    {variant === "error" ? <AlertIcon /> : null}
    {children}
  </div>
);
