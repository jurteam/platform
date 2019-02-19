import React from 'react'
import PropTypes from 'prop-types';

export const TableRow = ({ parentComponent, children }) => {
  const childrenArray = React.Children.toArray(children);
  const cells = childrenArray.map(cell => (
    React.cloneElement(cell, { parentComponent, ...cell.props })
  ));
  return <tr className="jur-table__row">{ cells }</tr>;
}