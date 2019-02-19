import React, { useState } from 'react'
import PropsTypes from 'prop-types';
import { CaretDownIcon } from '../Icons/CaretDownIcon';
import { CaretUpIcon } from '../Icons/CaretUpIcon';

export const TableCell = ({ className, parentComponent, children, onClick, align }) => {
  const [desc, setDesc] = useState(false);
  const handleClick = ev => {
    onClick.bind(this, ev, desc)();
    setDesc(!desc);
  }
  const Component = parentComponent === 'thead' ? 'th' : 'td';
  return (
    <Component
      align={ align }
      className={`jur-table__cell ${Component === 'th' ? 'jur-table__head' : ''}  ${className || ''} ${Component === 'th' && onClick ? 'jur-table__cell--sortable' : ''}`}
      {...(typeof onClick === 'function' && {onClick: handleClick})}
    >
        { children }
        { onClick ? desc ? <CaretUpIcon /> : <CaretDownIcon /> : null }
    </Component>
  )
};

TableCell.defaultProps = {
  align: 'left'
};