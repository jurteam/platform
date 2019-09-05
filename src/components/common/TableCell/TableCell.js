import React, { useState } from "react";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import { CaretUpIcon } from "../Icons/CaretUpIcon";

export const TableCell = ( props ) => {
  const {
    className,
    parentComponent,
    children,
    onClick,
    fieldName,
    noCarret,
    align
  } = props;
  const [order, setOrder] = useState(0);

  // 0 - no order - no arrow
  // 1 - asc - down arrow
  // 2 - desc - up arrow

  const handleClick = ev => {

      let neworder = order > 1 ? 0 : order + 1
      setOrder(neworder);
      onClick.bind(this,fieldName, neworder)();
  };
  const Component = parentComponent === "thead" ? "th" : "td";
  return (
    <Component
      align={align}
      className={`jur-table__cell ${
        Component === "th" ? "jur-table__head" : ""
      }  ${className || ""} ${
        Component === "th" && onClick ? "jur-table__cell--sortable" : ""
      }`}
      {...typeof onClick === "function" && { onClick: handleClick }}
    >
      {Component === "th" ? (
        <span dangerouslySetInnerHTML={{ __html: children }} />
      ) : (
        children
      )}
      {onClick && typeof noCarret === "undefined" ? order === 2 ? <CaretUpIcon /> : order === 1 ? <CaretDownIcon /> : null : null}
    </Component>
  );
};

TableCell.defaultProps = {
  align: "left"
};
