import React from "react";
import PropTypes from "prop-types";
import BlockTile from "../BlockTitle";

import "./ContractCaseDispute.scss";

export const ContractCaseDispute = ({ selectedCase, disputeDescription }) => (
  <div className="jur-contract-case-dispute">
    <BlockTile title="In Case of Dispute:" description={disputeDescription} />
    {selectedCase && (
      <div className="jur-contract-case-dispute__value">
        {selectedCase.label}
      </div>
    )}
  </div>
);
