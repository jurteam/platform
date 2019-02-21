import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ContractsIcon } from '../Icons/ContractsIcon';
import { DisputesIcon } from '../Icons/DisputesIcon';

import './MainNav.scss';

export class MainNav extends Component {

  state = {
    menuList: [
      {
        id: 0,
        label: 'Contracts',
        to: '/contracts'
      },
      {
        id: 1,
        label: 'Disputes',
        to: '/disputes'
      }
    ]
  }

  render() {
    return (
      <ul className="jur-main-nav">
        {this.state.menuList.map((navItem, index) => (
          <li 
            className={ `jur-main-nav__item jur-main-nav__item--${navItem.label.toLowerCase()}`}
            key={ navItem.id.toString() }
          >
            <NavLink to={ navItem.to } activeClassName="active">
              { navItem.to === '/contracts' ? <ContractsIcon /> : <DisputesIcon /> }
              <span title={ navItem.label }>{ navItem.label }</span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}