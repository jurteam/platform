import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const btnClass = "jur-btn";
const btnAttrs = ["size", "variant", "color", "fullWidth"];

export class Button extends Component {
  static propTypes = {
    color: PropTypes.oneOf([
      "info",
      "dispute",
      "success",
      "friendly",
      "muted",
      "dark-blue",
      "gradient"
    ]),
    variant: PropTypes.oneOf(["contained", "outlined", "raised", "gradient"]),
    size: PropTypes.oneOf(["small", "medium", "big"]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    className: "",
    color: "info",
    variant: "outlined",
    size: "small",
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

      if (!value) {
        return acc;
      }

      if (attr === "fullWidth") {
        value = "full-width";
      }

      return `${acc} ${btnClass}--${value}`;
    }, btnClass);

    return (
      <button className={cls + " " + className} {...buttonProps}>
        <span>{children}</span>
      </button>
    );
  }
}
