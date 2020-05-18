import React from "react";
import "./Divide.scss";

const Divide = ({ vertical }) =>
  vertical ? (
    <span className="jur-divide jur-divide__vertical">|</span>
  ) : (
    <hr className="jur-divide jur-divide__horizontal" />
  );

Divide.defaultProps = {
  vertical: false
};

export default Divide;
