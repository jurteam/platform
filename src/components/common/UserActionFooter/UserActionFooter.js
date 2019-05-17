import React from "react";


import "./UserActionFooter.scss";

export const UserActionFooter = ( props ) => {
  const { children, className } = props;
  return (<div className={`jur-user-action__footer ${className || ""}`}>{children}</div>);
};
