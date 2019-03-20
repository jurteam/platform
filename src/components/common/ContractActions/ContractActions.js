import React from "react";
import PropTypes from "prop-types";

import "./ContractActions.scss";

export const ContractActions = ({ children, statusId }) => {
  const renderSwitch = () => {
    switch (statusId) {
      case -1:
        return (
          <span className="jur-contract-actions__text">
            The Contract was rejected
          </span>
        );
      case 31:
        return (
          <span className="jur-contract-actions__text">
            Waiting for Counterparty
          </span>
        );
      default:
        return children;
    }
  };
  return <div className="jur-contract-actions">{renderSwitch()}</div>;
};
