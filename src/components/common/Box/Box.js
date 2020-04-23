import React from "react";
import "./Box.scss";

const Box = ({ children, type, title }) => (
  <section className={`jur-box jur-box__${type}`}>
    <h2 className="jur-box-title">{title}</h2>
    {children}
  </section>
);

Box.defaultProps = {
  type: "normal",
  title: ""
};

export default Box;
