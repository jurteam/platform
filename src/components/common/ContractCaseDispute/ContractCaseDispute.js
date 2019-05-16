import React, { useContext } from "react";
import PropTypes from "prop-types";
import BlockTile from "../BlockTitle";

import "./ContractCaseDispute.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractCaseDispute = props => {
  const { selectedCase } = props;
  const { labels } = useContext(AppContext);
  return (
    <div className="jur-contract-case-dispute">
      <BlockTile
        title={`${labels.inCaseOfDispute}:`}
        description={labels.inCaseOfDisputeDescription}
      />
      {selectedCase && (
        <div className="jur-contract-case-dispute__value">
          {selectedCase.label}
        </div>
      )}
    </div>
  );
};
