import React, { useContext } from "react";
import Tag from "../Tag";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

import "./ContractName.scss";

export const ContractName = ( props ) => {
  const {
    contractName,
    statusId,
    statusIdLabel,
    dispute,
    onContractNameChange
  } = props;
  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-name">
      {!dispute && <input
        type="text"
        name="contractName"
        placeholder={labels.contractNamePlaceholder}
        value={contractName || ""}
        onChange={onContractNameChange}
        readOnly={dispute}
      />}
      {dispute && <div className="jur-contract-name-div">{contractName || ""}</div>}
      <Tag statusId={statusId}>{statusIdLabel}</Tag>
    </div>
  );
};
