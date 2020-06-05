import React from "react";

export const AngleIcon = ({ fill = "#80868B", ...rest }) => (
  <svg viewBox="0 0 12 8" {...rest}>
    <polygon
      id="path-1"
      points="1.41 0 6 4.58 10.59 0 12 1.41 6 7.41 0 1.41"
      fill={fill}
    />
  </svg>
);
