import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './MainNav.scss';

export class MainNav extends Component {

  state = {
    menuList: [
      {
        id: 0,
        label: 'Contracts',
        to: '#contracts',
        icon: 'ContractsIcon',
        active: false,
      },
      {
        id: 1,
        label: 'Disputes',
        to: '#disputes',
        icon: 'DisputesIcon',
        active: false
      }
    ]
  }

  handleClick = (ev, activeNavId) => {
    ev.preventDefault();
    this.setState(state => {
      const menuList = state.menuList.reduce((acc, navItem) => {
        acc.push({
          ...navItem,
          active: navItem.id === activeNavId
        });
        return acc;
      }, []);
      return { ...state, menuList };
    });
  }

  render() {
    return (
      <ul className="jur-main-nav">
        {this.state.menuList.map((navItem, index) => (
          <li 
            className={ `jur-main-nav__item ${ navItem.active ? 'jur-main-nav__item--active' : ''}`}
            key={ navItem.id.toString() }
            onClick={ ev => this.handleClick(ev, navItem.id) }
          >
            <a href={ navItem.to }>
              <img src={`${process.env.PUBLIC_URL}/images/${navItem.icon}${navItem.active?'--active':''}.png`} alt="" />
              <span>{ navItem.label }</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
}