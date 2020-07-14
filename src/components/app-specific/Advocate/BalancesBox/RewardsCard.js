import React from "react";
import "./BalancesBox.scss";

import HeaderCard from "JurCommon/HeaderCard";
import AmountDisplay from "JurCommon/AmountDisplay";

const RewardsCard = ({ balance }) => (
  <HeaderCard title="Rewards Balance">
    <HeaderCard.Hero>
      <AmountDisplay balance={balance} />
    </HeaderCard.Hero>
  </HeaderCard>
);

export default RewardsCard;
