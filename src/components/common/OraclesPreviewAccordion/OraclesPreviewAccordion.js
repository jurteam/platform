import React from "react";
import PropTypes from "prop-types";
import ContractAccordion from "../ContractAccordion";
import OraclesTablePreview from "../OraclesTablePreview";

import "./OraclesPreviewAccordion.scss";

export const OraclesPreviewAccordion = props => {
  const {
    headers,
    data,
    currentUserWallet,
    viewAllDetails
  } = props;
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
};
