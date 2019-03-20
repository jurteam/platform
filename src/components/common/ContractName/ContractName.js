import React, { useContext } from "react";
import PropTypes from "prop-types";
import Tag from "../Tag";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

import "./ContractName.scss";

export const ContractName = ({
  contractName,
  statusId,
  statusIdLabel,
  onContractNameChange
}) => {
  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-name">
      <input
        type="text"
        name="contractName"
        placeholder={labels.contractNamePlaceholder}
        value={contractName || ""}
        onChange={onContractNameChange}
      />
      <Tag statusId={statusId}>{statusIdLabel}</Tag>
    </div>
  );
};
