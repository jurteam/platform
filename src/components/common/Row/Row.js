import React from "react";
import "./Row.scss";

const Row = ({ children, className, align = "" }) => (
  <div className={`jur-row jur-row__align-${align} ${className}`}>
    {children}
  </div>
);

export default Row;
