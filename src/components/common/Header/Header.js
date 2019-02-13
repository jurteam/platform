import React from 'react';
import './Header.scss';

export const Header = ({children}) => {
  return (
    <header className="jur-header">
      { children }
    </header>
  );
};