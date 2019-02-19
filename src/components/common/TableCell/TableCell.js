import React, { useState } from 'react'
import PropsTypes from 'prop-types';

export const TableCell = ({ className, parentComponent, children }) => {
  const [desc, setDesc] = useState(false);
  const handleClick = ev => {
    this.props.onClick.bind(this, ev, desc)();
    setDesc(!desc);
  }
  const Component = parentComponent === 'thead' ? 'th' : 'td';
  return (
    <Component
      className={`jur-table-cell ${className || ''}`}
      onClick={ handleClick }
    >
        { children }
    </Component>
  )
}
