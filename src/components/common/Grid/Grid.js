import React from "react";
import "./Grid.scss";

import { computeStyle } from "./helpers";

const Grid = ({ children, template = "", className = "" }) => (
  <div className={`jur-grid ${className}`} style={computeStyle(template)}>
    {children}
  </div>
);

export default Grid;
