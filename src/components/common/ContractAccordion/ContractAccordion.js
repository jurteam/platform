import React, { useState } from "react";
import { AngleIcon } from "../Icons/AngleIcon";
import InfoTooltip from "../InfoTooltip";

import "./ContractAccordion.scss";

export const ContractAccordion = ({
  tooltip,
  className,
  children,
  title,
  onOpen,
  initialOpen
}) => {
  const [isOpen, setOpenState] = useState(initialOpen || false);

  const onClick = () => {
    setOpenState(!isOpen);

    if (typeof onOpen === "function") onOpen(); // trigger on open
  };

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
        onClick={onClick}
      >
        <span className="jur-contract-accordion__title">
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
