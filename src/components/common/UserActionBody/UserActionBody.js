import React from "react";
import PropTypes from "prop-types";

import "./UserActionBody.scss";

export const UserActionBody = ( props ) => {
  const { children, className, dangerouslySetInnerHTML } = props;
  return (
    <div
      className={`jur-user-action__body ${className || ""}`}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </div>
  );
};
