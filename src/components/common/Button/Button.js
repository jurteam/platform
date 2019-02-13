import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const btnClass = 'jur-btn';
const btnAttrs = ['size', 'variant', 'color', 'fullWidth'];

export class Button extends Component {

  static propTypes = {
    color: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    color: 'default',
    variant: 'outlined',
    size: 'small',
    disabled: false,
    fullWidth: false
  };

  render() {
    const {
      children,
      color,
      size,
      variant,
      className,
      fullWidth,
      ...buttonProps
    } = this.props;

    let cls = btnAttrs.reduce((acc, attr) => {
      let value = this.props[attr];

      if (!value || value === 'default') {
        return acc;
      }

      if (attr === 'fullWidth') {
        value = 'full-width';
      }

      return `${acc} ${btnClass}--${value}`;
    }, btnClass);

    return (
      <button
        className={ cls + ' ' + className }
        { ...buttonProps }
      >
        <span>{ children }</span>
      </button>
    );
  }
}
