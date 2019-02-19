import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Button from '../Button';
import { CheckCircleIcon } from '../Icons/CheckCircleIcon';

import './Disclaimer.scss';

export const Disclaimer = ({ isOpen, title, description, accepted, declineLabel, acceptLabel, closeLabel, onAccept, onDecline }) => {
  const [_isOpen, setIsOpen] = useState(isOpen);
  const [_accepted, setAccept] = useState(accepted);

  const handleAccept = () => {
    setAccept(true);
    onAccept();
  }

  const handleDecline = () => {
    setAccept(false);
    onDecline();
  }

  return (
    <div className={`jur-disclaimer ${_isOpen ? 'jur-disclaimer--is-open': ''}`}>
      <h3 onClick={() => {setIsOpen(true)} }><span>{ title }</span> { !_isOpen ? <CheckCircleIcon /> : null }</h3> 
      { _isOpen ?
      <div className="jur-disclaimer__content">
        <div className="jur-disclaimer__description">{ description }</div>
          <div className="jur-disclaimer__cta">
            {_accepted ? 
              <Button size="small" variant="contained" onClick={ handleDecline }>{ declineLabel }</Button>
              : <Button size="small" variant="contained" onClick={ handleAccept }>{ acceptLabel }</Button>
            }
            <Button size="small" onClick={() => {setIsOpen(false)} }>{ closeLabel }</Button>
          </div>
      </div>
        : null
      }
    </div>
  );
};