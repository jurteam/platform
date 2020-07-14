import React from "react";
import PropTypes from "prop-types";

import { toCurrencyFormat } from "../../../utils/helpers";

import "./Amount.scss";

export const Amount = props => {
  const { value, currency, className } = props;
  return (
    <span className={`jur-amount ${className || ""}`} title={value}>
      {`${toCurrencyFormat(value)} ${currency.toUpperCase()}`}
    </span>
  );
};

Amount.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string,
  className: PropTypes.string
};

Amount.defaultProps = {
  currency: "JUR",
  value: 0
};
