import React from "react";
import "./Divide.scss";

const Divide = ({ vertical, className = "" }) =>
  vertical ? (
    <span className={`jur-divide jur-divide__vertical ${className}`}>|</span>
  ) : (
    <hr className={`jur-divide jur-divide__horizontal ${className}`} />
  );

Divide.defaultProps = {
  vertical: false
};

export default Divide;
