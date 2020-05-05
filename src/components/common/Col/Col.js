import React from "react";
import "./Col.scss";

const Col = ({ children, className }) => (
  <div className={`jur-col ${className}`}>{children}</div>
);

export default Col;
