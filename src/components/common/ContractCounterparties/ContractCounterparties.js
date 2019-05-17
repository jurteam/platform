import React from "react";

import BlockTitle from "../BlockTitle";
import AvatarInfo from "../AvatarInfo";

import "./ContractCounterparties.scss";

export const ContractCounterparties = ( props ) => {
  const {
    counterparties,
    CounterpartiesDescription
  } = props;
  return (
  <div className="jur-contract-counterparties">
    <BlockTitle
      title="Counterparties"
      description={CounterpartiesDescription}
      hideIcon
    />
    <div className="jur-contract-counterparties__value">
      {counterparties && counterparties.map((counterparty, idx) => (
        <AvatarInfo
          key={`counterparty-${idx}`}
          userName={counterparty.name}
          userWallet={counterparty.wallet.toLowerCase()}
          shouldRenderName={counterparty.renderName}
          variant={
            counterparty.renderName
              ? counterparty.name
                ? null
                : "ellipsis"
              : "ellipsis"
          }
        />
      ))}
      <AvatarInfo />
    </div>
  </div>
)};
