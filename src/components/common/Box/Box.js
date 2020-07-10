import React from "react";
import PropTypes from "prop-types";
import "./Box.scss";

const Box = ({ children, type, types, title, isLoading }) => (
  <section className={boxClass(types || type)}>
    <h2 className="jur-box-title">{title}</h2>
    {isLoading ? "Loading..." : children}
  </section>
);

function boxClass(types) {
  return "jur-box " + [""].concat(types.split(" ")).join(" jur-box__");
}

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
