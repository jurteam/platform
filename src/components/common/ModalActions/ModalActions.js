import React from 'react';
import PropTypes from 'prop-types';

export const ModalActions = ({ children, className}) => (
  <div className={`jur-modal__actions ${className || ''}`}>
    { children }
  </div>
);

ModalActions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};