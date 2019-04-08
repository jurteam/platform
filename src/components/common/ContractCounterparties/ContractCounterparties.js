import React from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";
import AvatarInfo from "../AvatarInfo";

import "./ContractCounterparties.scss";

export const ContractCounterparties = ({
  counterparties,
  CounterpartiesDescription
}) => (
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
          userWallet={counterparty.wallet}
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
);
