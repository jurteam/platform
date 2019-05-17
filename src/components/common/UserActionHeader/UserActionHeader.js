import React from "react";

import { AlertIcon } from "../Icons/AlertIcon";

import "./UserActionHeader.scss";

export const UserActionHeader = ( props ) => {
  const { children, className, variant } = props;
  return (
    <div
    className={`jur-user-action__header ${
      variant ? `jur-user-action__header--${variant}` : ""
    } ${className || ""}`}
  >
    {variant === "error" ? <AlertIcon /> : null}
    {children}
  </div>
  );
};
