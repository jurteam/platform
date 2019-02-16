import React, { Component } from 'react';

import './Dropdown.scss';

export class Dropdown extends Component {
  state = {
    isOpen: false
  }

  toggle = () => this.setState(state => ({ isOpen: !state.isOpen }))

  render() {
    let buttonEl = (
      <button
        className="jur-dropdown__toggle"
        onClick={this.toggle}
      >
        { this.props.label }
      </button>
    );
    return (
      <div className={`jur-dropdown ${this.state.isOpen ? 'jur-dropdown--open': ''}`}>
        {buttonEl}
        {this.state.isOpen && 
          <div className="jur-dropdown__actions">
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}
