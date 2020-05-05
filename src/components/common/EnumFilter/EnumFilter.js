import React from "react";
import "./EnumFilter.scss";

import Row from "JurCommon/Row";

const EnumFilter = ({ selected, enums, onChange }) => (
  <Row>
    {enums.map(f => (
      <span
        key={f}
        onClick={() => onChange(f)}
        className={`jur-enum-filter ${
          selected === f ? "jur-enum-filter__selected" : ""
        }`}
      >
        {f}
      </span>
    ))}
  </Row>
);

export default EnumFilter;
