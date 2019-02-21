import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Breadcrumbs.scss';

export const Breadcrumbs = ({ crumbList, className }) => (
  <ul className={`jur-breadcrumbs ${className || ''}`}>
    {crumbList.map((crumb, index) => (
      <li
        className="jur-breadcrumbs__item"
        key={(crumb.id) ? crumb.id.toString() : `bread-${index}`}
      >
        <NavLink to={ crumb.to }>{ crumb.label }</NavLink>
      </li>
    ))}
  </ul>
);

Breadcrumbs.propTypes = {
  crumbList: PropTypes.array.isRequired,
  className: PropTypes.string
};

Breadcrumbs.defaultProps = {
  crumbList: []
};