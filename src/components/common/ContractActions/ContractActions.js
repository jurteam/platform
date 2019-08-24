import React, {useContext} from "react";


import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ContractActions.scss";

export const ContractActions = ( props ) => {
  const { children, statusId, statusFrom, currentWallet, part, shouldWait, disabled } = props;
  const { labels } = useContext(AppContext);
  console.log("ContractActions - props", { children, statusId, part });
  const renderSwitch = () => {
    switch (statusId) {
      case -1:
        return (
          <span className="jur-contract-actions__text">
            {labels.contractWasRejected}
          </span>
        );
      case 1: // returns waiting only when is part A.
        return part === "b" ? children :
          <span className="jur-contract-actions__text">
            {labels.waitingForCounterparty}
          </span>
        ;
      case 2: // returns waiting only when last action is made for current part.
      case 3: // returns waiting only when last action is made for current part.
      case 7: // returns waiting only when last action is made for current part.
        return statusFrom !== currentWallet.address ? children :
          <span className="jur-contract-actions__text">
            {labels.waitingForCounterparty}
          </span>
        ;
      case 21: // returns waiting only when is part A.
        return part === "b" ? children :
          <span className="jur-contract-actions__text">
            {labels.waitingForCounterparty}
          </span>
        ;
      case 9:
        return (statusFrom !== currentWallet.address || children) ? children :
        <span className="jur-contract-actions__text">
            {labels.contractIsClosed}
          </span>
        ;
      case 10:
      case 29:
        return (
          <span className="jur-contract-actions__text">
            {labels.contractIsClosed}
          </span>
        );
      case 31: // returns waiting based on last part involved.
        return !shouldWait ? children :
          <span className="jur-contract-actions__text">
            {labels.waitingForCounterparty}
          </span>
        ;
      default:
        return props.children;
    }
  };
  return <div className={`jur-contract-actions ${disabled ? "jur-contract-actions__disabled" : null}`}>{renderSwitch()}</div>;
};
