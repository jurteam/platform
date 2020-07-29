import React from "react";
import "./BalancesBox.scss";

import HeaderCard from "JurCommon/HeaderCard";
import AmountDisplay from "JurCommon/AmountDisplay";
import { AngleIcon } from "JurCommon/Icons/AngleIcon";
import { mapLabelsToProps } from "../../../../utils/helpers";

const IconHandler = ({ isShown, fill }) => (
  <div
    className={`jur-balance-card-icon jur-balance-card-icon__${
      isShown ? "down" : "up"
    }`}
  >
    <AngleIcon fill={fill} />
  </div>
);

const AvailableCard = ({ balance, isShown, onViewDetails, labels }) => (
  <HeaderCard
    title={labels.activitiesAvailable}
    description={labels.advocateAvailableCardDescription}
  >
    <HeaderCard.Hero>
      <AmountDisplay balance={balance} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <a
        onClick={balance && onViewDetails}
        className={`jur-balance-card-view-details jur-balance-card-view-details__${
          balance > 0 ? "active" : "inactive"
        }`}
      >
        {labels.viewDetails}{" "}
        <IconHandler
          isShown={isShown}
          fill={balance > 0 ? "#0077ff" : undefined}
        />
      </a>
    </HeaderCard.Body>
  </HeaderCard>
);

export default global.connection(AvailableCard, mapLabelsToProps);
