import React from 'react';

export const DropdownItem = ({ onClick, children, className }) => {
  return (
    <div
      className={`jur-dropdown__item ${ className || '' }`}
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
};