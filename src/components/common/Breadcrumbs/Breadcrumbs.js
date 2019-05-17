import React from 'react'
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

import './Breadcrumbs.scss';

export const Breadcrumbs = ( props ) => (
  <ul className={`jur-breadcrumbs ${props.className || ""}`}>
    {props.crumbList.map((crumb, index) => (
      <li
        className="jur-breadcrumbs__item"
        key={(crumb.id) ? crumb.id.toString() : `bread-${index}`}
      >
        <NavLink exact={crumb.exact || false} to={ crumb.to }>{ crumb.label }</NavLink>
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