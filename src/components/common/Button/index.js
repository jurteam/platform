import React, { Component } from 'react';
import PropTypes from 'prop-types';

const btnClass = 'jur-btn';
const btnAttrs = {
  size: 1,
  variant: 1,
  color: 1
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
    variant: 'default',
    size: 'small',
    disabled: false
  };

  render() {
    const {
      children,
      color,
      size,
      variant,
      className,
      disabled,
      ...buttonProps
    } = this.props;
    let cls = btnClass,
        v,
        k;

    buttonProps.disabled = disabled;

    for(k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
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