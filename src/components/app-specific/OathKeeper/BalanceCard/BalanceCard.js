import React from "react";

import "./BalanceCard.scss";
import HeaderCard from "JurCommon/HeaderCard";
import Amount from "JurCommon/Amount";
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

const BalanceCard = ({ balance, isShown, onViewDetails }) => (
  <HeaderCard title="Oath Keeper Balance">
    <HeaderCard.Hero>
      <Amount value={balance} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <a
        onClick={onViewDetails}
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

export default BalanceCard;
