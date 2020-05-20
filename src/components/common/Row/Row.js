import React from "react";
import "./Row.scss";

const Row = ({ children, className }) => (
  <div className={`jur-row ${className}`}>{children}</div>
);

export default Row;
