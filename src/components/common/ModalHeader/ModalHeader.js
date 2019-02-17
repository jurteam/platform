import React from 'react';
import PropTypes from 'prop-types';

import './ModalHeader.scss';

export const ModalHeader = ({ children, className, title }) =>(
  <div className={`jur-modal__header ${className || ''}`}>
    <h2>{ title }</h2>
    { children }
  </div>
)

ModalHeader.propTypes = {
  children : PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string
};