import React from "react";
import PropTypes from "prop-types";
import "./Box.scss";

const Box = ({ children, type, title, isLoading }) => (
  <section className={`jur-box jur-box__${type}`}>
    <h2 className="jur-box-title">{title}</h2>
    {isLoading ? "Loading..." : children}
  </section>
);

Box.defaultProps = {
  type: "normal",
  title: "",
  isLoading: false
};

Box.propTypes = {
  type: PropTypes.oneOf(["normal", "hero", "header", "footer", "message"]),
  isLoading: PropTypes.bool
};

export default Box;
