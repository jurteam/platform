import React from 'react';
import PropTypes from 'prop-types';

export const ModalTitle = ({ children, className }) =>(
  <div className={`jur-modal__title ${className || ''}`}>
    { children }
  </div>
)

ModalTitle.propTypes = {
  children : PropTypes.node.isRequired
};