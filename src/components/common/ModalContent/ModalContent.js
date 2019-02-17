import React from 'react';
import PropTypes from 'prop-types';

export const ModalContent = ({ children, className }) => (
  <div className={`jur-modal__content ${className || ''}`}>
    { children }
  </div>
);

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};