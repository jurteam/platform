import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import Amount from "../Amount";
import BlockTitle from "../BlockTitle";

import "./ContractPenaltyFee.scss";

export const ContractPenaltyFee = props => {
  const { contractInfo, penaltyFeeDescription } = props;
  return (
    <div className="jur-contract-penalty-fee">
      <BlockTitle title="Penalty Fee" description={penaltyFeeDescription} />
      {contractInfo && (
        <div className="jur-contract-penalty-fee__value">
          {contractInfo.penaltyFee.partA && (
            <div>
              <Avatar seed={contractInfo.partA} size="xxsmall" />
              <Amount value={contractInfo.penaltyFee.partA} />
            </div>
          )}
          {contractInfo.penaltyFee.partB && (
            <div>
              <Avatar seed={contractInfo.partB} size="xxsmall" />
              <Amount value={contractInfo.penaltyFee.partB} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
