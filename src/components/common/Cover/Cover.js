import React from "react";
import "./Cover.scss";

const Cover = ({ children, className }) => (
  <div className={`jur-cover ${className}`}>{children}</div>
);

export default Cover;
