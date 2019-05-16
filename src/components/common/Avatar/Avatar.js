import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Blockies from "react-blockies";
import "./Avatar.scss";

export const Avatar = props => {
  const { seed, size, variant, className, ...rest } = props;
  const variants = {
    rounded: "jur-avatar--rounded",
    circle: "jur-avatar--circle"
  };
  const currentVariant = variant ? variants[variant] : "";

  return (
    <Fragment>
      {seed && (
        <div
          className={`jur-avatar ${className} jur-avatar--${size} ${currentVariant}`}
          {...rest}
        >
          <Blockies seed={seed} />
        </div>
      )}
    </Fragment>
  );
};

Avatar.propTypes = {
  seed: PropTypes.string,
  size: PropTypes.oneOf([
    "xxsmall",
    "xsmall",
    "small",
    "medium",
    "large",
    "xlarge",
    "xxlarge",
    "xxxlarge"
  ]),
  variant: PropTypes.oneOf(["rounded", "circle"])
};

Avatar.defaultProps = {
  size: "medium"
};

// const sizes = {
//   xxsmall: 12,
//   xsmall: 16,
//   small: 24,
//   medium: 30,
//   large: 40,
//   xlarge: 48,
//   xxlarge: 64,
//   xxxlarge: 100
// };
