import React from "react";

export const DropdownItem = ( props ) => {
  const { onClick, children, className } = props;
  const handleClick = ev => {
    ev.stopPropagation();
    onClick();
  };
  return (
    <div
      className={`jur-dropdown__item ${className || ""}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
