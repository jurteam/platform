import React from "react";
import PropTypes from "prop-types";
import "./RadioInputRow.scss";

import Row from "JurCommon/Row";

const RadioInputRow = ({ options, selected, onChange, className }) => (
  <Row align="space-between" className={className}>
    {options.map(o => (
      <span
        key={o.value}
        className={optionClass(o, selected)}
        onClick={() => onChange(o)}
      >
        {o.label}
      </span>
    ))}
  </Row>
);

RadioInputRow.defaultProps = {
  options: []
};

RadioInputRow.propTypes = {
  selected: PropTypes.object.isRequired
};

function optionClass(option, selected) {
  return [
    "jur-radio-input-row__option",
    selected.value === option.value ? "jur-radio-input-row__option" : ""
  ].join(" ");
}

export default RadioInputRow;
