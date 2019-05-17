import React, { useContext } from "react";

import Avatar from "../Avatar";
import Amount from "../Amount";
import BlockTitle from "../BlockTitle";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ContractPenaltyFee.scss";

export const ContractPenaltyFee = ( props ) => {
  const { contractInfo } = props;

  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-penalty-fee">
      <BlockTitle title={labels.penaltyFee} description={labels.penaltyFeeDescription} />
      {contractInfo && contractInfo.penaltyFee && (
        <div className="jur-contract-penalty-fee__value">
          {contractInfo.penaltyFee.partA ? (
            <div>
              <Avatar seed={contractInfo.partA} size="xxsmall" />
              <Amount value={contractInfo.penaltyFee.partA} />
            </div>
          ) : null}
          {contractInfo.penaltyFee.partB ? (
            <div>
              <Avatar seed={contractInfo.partB} size="xxsmall" />
              <Amount value={contractInfo.penaltyFee.partB} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
