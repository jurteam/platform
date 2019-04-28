import React from "react";
import PropTypes from "prop-types";
import BlockTile from "../BlockTitle";

import "./ContractCaseDispute.scss";

export const ContractCaseDispute = props => (
  <div className="jur-contract-case-dispute">
    <BlockTile title="In Case of Dispute:" description={props.disputeDescription} />
    {props.selectedCase && (
      <div className="jur-contract-case-dispute__value">
        {props.selectedCase.label}
      </div>
    )}
  </div>
);
