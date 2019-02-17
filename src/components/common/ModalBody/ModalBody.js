import React from 'react';
import PropTypes from 'prop-types';

import './ModalBody.scss';

export const ModalBody = ({ children, className }) => (
  <div className={`jur-modal__content ${className || ''}`}>
    { children }
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};