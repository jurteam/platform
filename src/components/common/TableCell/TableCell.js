import React, { useState } from 'react'
import PropsTypes from 'prop-types';
import { CaretDownIcon } from '../Icons/CaretDownIcon';
import { CaretUpIcon } from '../Icons/CaretUpIcon';

export const TableCell = ({ className, parentComponent, children, onClick }) => {
  const [desc, setDesc] = useState(false);
  const handleClick = ev => {
    onClick.bind(this, ev, desc)();
    setDesc(!desc);
  }
  const Component = parentComponent === 'thead' ? 'th' : 'td';
  return (
    <Component

      className={`jur-table__cell ${className || ''} ${Component === 'th' && onClick ? 'jur-table-cell--sortable' : ''}`}
      onClick={ handleClick }
    >
        { children }
        { onClick ? desc ? <CaretDownIcon /> : <CaretUpIcon /> : null }
    </Component>
  )
}
