import React from "react";
import "./BalancesBox.scss";

import HeaderCard from "JurCommon/HeaderCard";
import AmountDisplay from "JurCommon/AmountDisplay";
import { mapLabelsToProps } from "../../../../utils/helpers";

const RewardsCard = ({ balance, labels }) => (
  <HeaderCard
    title={labels.rewardBalance}
    description={labels.advocateRewardsCardDescription}
  >
    <HeaderCard.Hero>
      <AmountDisplay balance={balance} />
    </HeaderCard.Hero>
  </HeaderCard>
);

export default global.connection(RewardsCard, mapLabelsToProps);
