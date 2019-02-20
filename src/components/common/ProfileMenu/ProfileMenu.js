import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './ProfileMenu.scss';

export const ProfileMenu = ({ className, menuList }) => (
  <ul className={`jur-profile-menu ${className || ''}`}>
    {menuList.map((item, index) => (
      <li
      className={`jur-profile-menu__item`}
      key={item.id.toString()}
    >
      <NavLink
        to={ item.to }
        activeClassName="active"
      >
        { item.label }
        </NavLink>
    </li>
    ))}
  </ul>
);

ProfileMenu.propTypes = {
  className: PropTypes.string,
  menuList: PropTypes.array.isRequired
};