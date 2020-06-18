import React from "react";
import "./Frame.scss";
const Frame = ({ children, className = "" }) => (
  <div className={`jur-frame ${className}`}>{children}</div>
);
export default Frame;
