import React from 'react'
import PropTypes from 'prop-types';

import './ProfileMenu.scss';

export const ProfileMenu = ({ className, menuList }) => (
  <ul className={`jur-profile-menu ${className || ''}`}>
    {menuList.map((item, index) => (
      <li
      className={`jur-profile-menu__item ${item.active ? 'jur-profile-menu__item--active' : ''}`}
      key={item.id.toString()}
    >
      <a href={ item.to }>{ item.label }</a>
    </li>
    ))}
  </ul>
);