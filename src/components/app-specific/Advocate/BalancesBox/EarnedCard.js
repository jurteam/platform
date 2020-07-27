import React from "react";
import "./BalancesBox.scss";

import HeaderCard from "JurCommon/HeaderCard";
import AmountDisplay from "JurCommon/AmountDisplay";
import { mapLabelsToProps } from "../../../../utils/helpers";

const EarnedCard = ({ balance, labels }) => (
  <HeaderCard
    title="Total Earned"
    description={labels.advocateEarnedCardDescription}
  >
    <HeaderCard.Hero>
      <AmountDisplay balance={balance} />
    </HeaderCard.Hero>
  </HeaderCard>
);

export default global.connection(EarnedCard, mapLabelsToProps);
