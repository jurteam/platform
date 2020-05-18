import React from "react";
import "./Text.scss";

const Text = ({ children, size, type, className }) =>
  React.createElement(
    type,
    {
      className: `jur-text jur-text__${size} ${className}`
    },
    children
  );

Text.defaultProps = {
  size: "normal",
  type: "p"
};

export default Text;
