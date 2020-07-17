import React from "react";
import "./Grid.scss";

const GridCell = ({ children, vertical, horizontal, className = "" }) => (
  <div
    className={`jur-grid__cell jur-grid__cell-justify-${horizontal} jur-grid__cell-align-${vertical} ${className}`}
  >
    {children}
  </div>
);

GridCell.defaultProps = {
  vertical: "",
  horizontal: "",
  className: ""
};

export default GridCell;
