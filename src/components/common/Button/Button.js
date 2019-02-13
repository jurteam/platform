import React, { Component } from 'react';
import PropTypes from 'prop-types';

const btnClass = 'jur-btn';
const btnAttrs = {
  size: 1,
  variant: 1,
  color: 1,
  fullWidth: 1
};

class Button extends Component {

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
      disabled,
      fullWidth,
      ...buttonProps
    } = this.props;
    let cls = btnClass,
        v,
        k;

    buttonProps.disabled = disabled;

    for(k in btnAttrs) {
      v = this.props[k];
      if (v && k === 'fullWidth') cls += ' ' + btnClass + '--full-width';
      if (v !== 'default' && k !== 'fullWidth') cls += ' ' + btnClass + '--' + v;
    }

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

export default Button;