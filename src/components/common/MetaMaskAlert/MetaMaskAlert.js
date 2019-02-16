
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { AlertIcon } from '../Icons/AlertIcon';

import './MetaMaskAlert.scss';

export const MetaMaskAlert = ({ title, description, clickHandle, buttonLabel, buttonSize, className }) => {
  return (
    <div className={ `jur-meta-mask-alert ${ className || ''}`}>
      <div className="jur-meta-mask-alert__title">
        <AlertIcon />
        { title }
      </div>
      <div className="jur-meta-mask-alert__content">
        <p className="jur-meta-mask-alert__description">{ description }</p>
        <Button
          size={ buttonSize }
          onClick={() => clickHandle() }
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

MetaMaskAlert.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired,
  clickHandle: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  buttonSize: PropTypes.string
};

MetaMaskAlert.defaultProps = {
  buttonLabel: 'Get Chrome Extension',
  buttonSize: 'big'
}