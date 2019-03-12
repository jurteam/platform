import React from 'react';
import PropTypes from 'prop-types';

import './Aside.scss';

export const Aside = ({ children }) => (
  <aside className="jur-aside">{ children }</aside>
);
