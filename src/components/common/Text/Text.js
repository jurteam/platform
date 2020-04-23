import React from "react";
import "./Text.scss";

const Text = ({ children, size }) => (
  <p className={`jur-text jur-text__${size}`}>{children}</p>
);

Text.defaultProps = {
  size: "normal"
};

export default Text;
