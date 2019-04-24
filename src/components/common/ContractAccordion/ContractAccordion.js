import React, { useState } from "react";
import { AngleIcon } from "../Icons/AngleIcon";
import { EllipsisVIcon } from "../Icons/EllipsisVIcon";
import InfoTooltip from "../InfoTooltip";

import "./ContractAccordion.scss";

export const ContractAccordion = ({
  tooltip,
  className,
  children,
  title,
  onOpen,
  initialOpen,
  loading
}) => {
  const [isOpen, setOpenState] = useState(initialOpen || false);

  const onClick = () => {
    if (!loading) {

      setOpenState(!isOpen);

      if (typeof onOpen === "function") onOpen(); // trigger on open
    }
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
          {tooltip && <InfoTooltip text={tooltip} />}
        </span>
        <span className="jur-contract-accordion__arrow">
          {!loading ? <AngleIcon /> : <EllipsisVIcon />}
        </span>
      </div>
      {isOpen && !loading && (
        <div className="jur-contract-accordion__content">{children}</div>
      )}
    </div>
  );
};
