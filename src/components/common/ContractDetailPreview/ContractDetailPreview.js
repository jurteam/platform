import React from 'react';
import PropTypes from 'prop-types';
import BlockTitle from '../BlockTitle';
import {urlify} from '../../../utils/helpers';

import './ContractDetailPreview.scss';

export const ContractDetailPreview = ({label, message}) => {
  const processedMessage = urlify(message);
  return (
    <div className="jur-contract-detail-preview">
      <BlockTitle title={label} hideIcon />
      <div className="jur-contract-detail-preview__message" dangerouslySetInnerHTML={{__html: processedMessage}} />
    </div>
  );
};
