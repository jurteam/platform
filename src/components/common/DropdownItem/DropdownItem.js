import React from "react";

export const DropdownItem = ({ onClick, children, className }) => {
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
