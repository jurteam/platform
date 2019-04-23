import React, {useContext} from "react";
import PropTypes from "prop-types";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ContractActions.scss";

export const ContractActions = ({ children, statusId, part }) => {
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
      case 21: // returns waiting only when is part A.
        return part === "b" ? children :
          <span className="jur-contract-actions__text">
            {labels.waitingForCounterparty}
          </span>
        ;
      case 9:
      case 29:
        return (
          <span className="jur-contract-actions__text">
            {labels.contractIsClosed}
          </span>
        );
      case 31:
        return (
          <span className="jur-contract-actions__text">
            {labels.waitingForCounterparty}
          </span>
        );
      default:
        return children;
    }
  };
  return <div className="jur-contract-actions">{renderSwitch()}</div>;
};
