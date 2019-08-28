import React, { useContext } from "react";

import BlockTitle from "../BlockTitle";
import Avatar from "../Avatar";
import Amount from "../Amount";

import "./ContractAmount.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractAmount = ( props ) => {
  const { debtorWalletAddress, amount } = props;
  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-amount">
      <BlockTitle title={labels.payment} description={labels.paymentDescription} />
      {debtorWalletAddress && amount && (
        <div className="jur-contract-amount__value">
          <Avatar seed={debtorWalletAddress} size="xxsmall" />
          <Amount value={parseFloat(amount)} />
        </div>
      )}
    </div>
  );
};
