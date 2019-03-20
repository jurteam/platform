import React, { useState } from "react";
import PropTypes from "prop-types";
import { AngleIcon } from "../Icons/AngleIcon";
import InfoTooltip from "../InfoTooltip";

import "./ContractAccordion.scss";

export const ContractAccordion = ({
  tooltip,
  className,
  children,
  title,
  initialOpen,
  borderBottom
}) => {
  const [isOpen, setOpenState] = useState(initialOpen || false);
  const classes = {
    "jur-contract-accordion": true,
    "jur-contract-accordion--open": isOpen
  };
  const classNames = Object.keys(classes)
    .filter(classItem => classes[classItem])
    .join(" ");

  return (
    <div className={`${classNames} ${className}`}>
      <div
        className="jur-contract-accordion__header"
        onClick={() => setOpenState(!isOpen)}
      >
        <span class="jur-contract-accordion__title">
          {title}
          {tooltip && <InfoTooltip />}
        </span>
        <span className="jur-contract-accordion__arrow">
          <AngleIcon />
        </span>
      </div>
      {isOpen && (
        <div className="jur-contract-accordion__content">{children}</div>
      )}
    </div>
  );
};
