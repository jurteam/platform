import React from "react";

export const TableRow = (props) => {
  const { parentComponent, children, className, onClick, key, ...params } = props;
  const childrenArray = React.Children.toArray(children);
  const cells = childrenArray.map(cell =>
    React.cloneElement(cell, { parentComponent, ...cell.props })
  );
  return (
    <tr
      className={`jur-table__row ${className || ""}`}
      {...onClick && { onClick }}
      {...params}
    >
      {cells}
    </tr>
  );
};
