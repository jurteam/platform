import React from "react";
import "./Text.scss";

const Text = ({ children, size, type, transform, className }) =>
  React.createElement(
    type,
    {
      className: `jur-text jur-text__${size} jur-text__transform-${transform} ${className}`
    },
    children
  );

Text.defaultProps = {
  size: "normal",
  type: "p"
};

export default Text;
