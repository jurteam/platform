import React from "react";
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

export default Box;
