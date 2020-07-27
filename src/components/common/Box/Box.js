import React from "react";
import PropTypes from "prop-types";
import "./Box.scss";

const Box = ({ children, type, types, hide = false, title, isLoading, id }) => (
  <section className={boxClass(types || type, hide)} id={id}>
    <h2 className="jur-box-title">{title}</h2>
    {isLoading ? "Loading..." : children}
  </section>
);

function boxClass(types, hide) {
  let classes = "jur-box " + [""].concat(types.split(" ")).join(" jur-box__");
  if (hide) classes += " hidden";
  return classes;
}

Box.defaultProps = {
  type: "normal",
  title: "",
  isLoading: false
};

Box.propTypes = {
  type: PropTypes.oneOf([
    "normal",
    "hero",
    "header",
    "subheader",
    "footer",
    "message"
  ]),
  isLoading: PropTypes.bool
};

export default Box;
