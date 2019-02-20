import React from 'react';
import PropTypes from 'prop-types';

import './UserTerms.scss';

export const UserTerms = ({ termsHtml }) => (
  <div className="jur-terms">
    <h3>Terms of Service</h3>
    <div className="jur-terms__content" dangerouslySetInnerHTML={{__html: termsHtml }}/>
  </div>
);
