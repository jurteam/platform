import React from "react";
import "./BalancesBox.scss";

import HeaderCard from "JurCommon/HeaderCard";
import AmountDisplay from "JurCommon/AmountDisplay";
import { AngleIcon } from "JurCommon/Icons/AngleIcon";

const IconHandler = ({ isShown, fill }) => (
  <div
    className={`jur-balance-card-icon jur-balance-card-icon__${
      isShown ? "down" : "up"
    }`}
  >
    <AngleIcon fill={fill} />
  </div>
);

const AvailableCard = ({ balance, isShown, onViewDetails }) => (
  <HeaderCard title="Activities Available">
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
        View Details{" "}
        <IconHandler
          isShown={isShown}
          fill={balance > 0 ? "#0077ff" : undefined}
        />
      </a>
    </HeaderCard.Body>
  </HeaderCard>
);

export default AvailableCard;
