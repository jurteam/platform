import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const btnClass = "jur-btn";
const btnAttrs = ["size", "variant", "color", "fullWidth"];

const generateClasses = (props, attr, baseClass, isHover) => {
  return attr.reduce((acc, attr) => {
    let value = props[attr];

    if (!value) {
      return acc;
    }

    if (attr === "fullWidth") {
      value = "full-width";
    }

    return `${acc} ${baseClass}--${value}${isHover ? "--hover" : ""}`;
  }, baseClass)
}

export const Button = ( props ) => {
  const {
    children,
    color,
    size,
    variant,
    hoverColor,
    className,
    fullWidth,
    ...buttonProps
  } = props;

  let cls = generateClasses(props, btnAttrs, btnClass);
  let hoverCls = hoverColor ? `jur-btn--${hoverColor}--hover` : "";

  return (
    <button
      className={`${[cls, className, hoverCls].join(" ")}`}
      {...buttonProps}
    >
      <span>{children}</span>
    </button>
  );
};


generateClasses.PropTypes = {
  color: PropTypes.oneOf([
    "info",
    "dispute",
    "success",
    "friendly",
    "muted",
    "dark-blue",
    "gradient"
  ]),
  hoverColor: PropTypes.oneOf([
    "info",
    "dispute",
    "success",
    "friendly",
    "muted",
    "dark-blue",
    "gradient"
  ]),
  variant: PropTypes.oneOf(["contained", "outlined", "raised", "gradient"]),
  hoverVariant: PropTypes.oneOf(["contained", "outlined", "raised", "gradient"]),
  size: PropTypes.oneOf(["small", "medium", "big"]),
  hoverSize: PropTypes.oneOf(["small", "medium", "big"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired
};

generateClasses.defaultProps = {
  className: "",
  color: "info",
  variant: "outlined",
  size: "small",
  disabled: false,
  fullWidth: false
};