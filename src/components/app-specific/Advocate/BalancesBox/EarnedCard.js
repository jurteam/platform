import React from "react";
import "./BalancesBox.scss";

import HeaderCard from "JurCommon/HeaderCard";
import AmountDisplay from "JurCommon/AmountDisplay";

const EarnedCard = ({ balance }) => (
  <HeaderCard title="Total Earned">
    <HeaderCard.Hero>
      <AmountDisplay balance={balance} />
    </HeaderCard.Hero>
  </HeaderCard>
);

export default EarnedCard;
