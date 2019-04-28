import React from "react";
import PropTypes from "prop-types";
import Tag from "../Tag";

import "./ContractName.scss";

export const ContractName = props => {
  const {
    contractName,
    statusId,
    statusIdLabel,
    onContractNameChange
  } = props;
  return (
    <div className="jur-contract-name">
      <input
        type="text"
        value={contractName || ""}
        onChange={onContractNameChange}
      />
      <Tag statusId={statusId}>{statusIdLabel}</Tag>
    </div>
  );
};
