import React from 'react';
import PropTypes from 'prop-types';
import ContractAccordion from '../ContractAccordion';
import OraclesTablePreview from '../OraclesTablePreview';

import './OraclesPreviewAccordion.scss';

export const OraclesPreviewAccordion = ({headers, data, currentUserWallet, viewAllDetails}) => {
  return (
    <ContractAccordion title="Oracles" tooltip>
      <OraclesTablePreview
        headers={headers}
        data={data}
        currentUserWallet={currentUserWallet}
        viewAllDetails={viewAllDetails}
      />
    </ContractAccordion>
  );
}
