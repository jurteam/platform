import React from 'react'
import PropTypes from 'prop-types';

export const Table = ({ children, className }) => (
  <table className={`jur-table ${className || ''}`}>{ children }</table>
);