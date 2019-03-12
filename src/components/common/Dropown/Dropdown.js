import React, { Component } from 'react';

import './Dropdown.scss';

export class Dropdown extends Component {
  state = {
    isOpen: false
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (!this.state.isOpen && nextState.isOpen) {
      document.addEventListener('click', this.onOutsideClick);
    } else if (this.state.isOpen && !nextState.isOpen) {
      document.removeEventListener('click', this.onOutsideClick);
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onOutsideClick);
  }

  onOutsideClick = (ev) => {
    let isClickInside = this.wrapperElRef.contains(ev.target);
    if (!isClickInside) this.close();
  }

  toggle = () => this.setState(state => ({ isOpen: !state.isOpen }))

  close = () => this.setState({ isOpen: false })

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
      <div
        className={`jur-dropdown ${this.state.isOpen ? 'jur-dropdown--open': ''}`}
        ref={el => { this.wrapperElRef = el }}
      >
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
