import React from "react";
import "./EnumFilter.scss";

import Row from "JurCommon/Row";
import Divide from "JurCommon/Divide";

const EnumFilter = ({ selected, enums, onChange }) => (
  <Row className="jur-enum-filter-row">
    {enums
      .map(f => (
        <span
          key={f}
          onClick={() => onChange(f)}
          className={`jur-enum-filter ${
            selected === f ? "jur-enum-filter__selected" : ""
          }`}
        >
          {f}
        </span>
      ))
      .reduce((acc, item, index) => {
        acc.push(item);
        if (enums.length - 1 == index) return acc;
        acc.push(<Divide vertical={true} key={`divide-${index}`} />);
        return acc;
      }, [])}
  </Row>
);

export default EnumFilter;
