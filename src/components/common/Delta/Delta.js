import React from "react";
import "./Delta.scss";

const className = value =>
  [
    "jur-delta",
    "jur-delta__" + (Number(value) < 0 ? "negative" : "positive")
  ].join(" ");

const Delta = ({ value }) => <div className={className(value)}>{value}</div>;

export default Delta;
