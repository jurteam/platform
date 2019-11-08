import React, { useContext } from "react";
import Tag from "../Tag";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

import "./ContractName.scss";

export const ContractName = props => {
  const {
    contractName,
    statusId,
    statusIdLabel,
    dispute,
    counterparties,
    onContractNameChange
  } = props;
  const { labels } = useContext(AppContext);

  const placeholder =
    statusId !== 0
      ? labels.noContractName
          .replace(
            "%partA%",
            counterparties[0].renderName && counterparties[0].name
              ? counterparties[0].name
              : counterparties[0].wallet
          )
          .replace(
            "%partB%",
            counterparties[1].renderName && counterparties[1].name
              ? counterparties[1].name
              : counterparties[1].wallet
          )
      : labels.contractNamePlaceholder;

  return (
    <div className="jur-contract-name">
      {!dispute && (
        <input
          type="text"
          name="contractName"
          placeholder={placeholder}
          value={contractName || ""}
          onChange={onContractNameChange}
          readOnly={dispute || statusId !== 0}
          maxLength={250}
        />
      )}
      {dispute && (
        <div className="jur-contract-name-div">{contractName || ""}</div>
      )}
      <Tag statusId={statusId}>{statusIdLabel}</Tag>
    </div>
  );
};
