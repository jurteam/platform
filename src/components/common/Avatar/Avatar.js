import React from 'react';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';
import './Avatar.scss';

export const Avatar = ({ seed, size, variant }) => {
  const sizes = {
    xxsmall: { size: 4, scale: 3 },
    xsmall: { size: 4, scale: 4 },
    small: { size: 6, scale: 4 },
    medium: { size: 6, scale: 5 },
    large: { size: 8, scale: 5 },
    xlarge: { size: 8, scale: 6 },
    xxlarge: { size: 8, scale: 8 },
    xxxlarge: { size: 10, scale: 10 }
  };
  
  const variants = {
    rounded: 'jur-avatar--rounded',
    circle: 'jur-avatar--circle'
  };

  return (
    <div className={`jur-avatar ${variants[variant]}`}>
      <Blockies seed={seed} { ...sizes[size] }/>
    </div>
  );
};

Avatar.propTypes = {
  seed: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge']),
  variant: PropTypes.oneOf(['rounded', 'circle'])
};

Avatar.defaultProps = {
  size: "medium"
};

// 12 xxsmall
// 16  xsmall
// 24  small
// 30  medium
// 40 large
// 48 xlarge
// 64 xxlarge
// 100 xxxlarge
