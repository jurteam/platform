import React from "react";

import "./BalanceCard.scss";
import HeaderCard from "JurCommon/HeaderCard";
import Amount from "JurCommon/Amount";
import { AngleIcon } from "JurCommon/Icons/AngleIcon";

const IconHandler = ({ isShown }) => (
  <div
    className={`jur-balance-card-icon jur-balance-card-icon__${
      isShown ? "down" : "up"
    }`}
  >
    <AngleIcon />
  </div>
);

const BalanceCard = ({ balance, isShown, onViewDetails }) => (
  <HeaderCard title="Oath Keeper Balance">
    <HeaderCard.Hero>
      <Amount value={balance} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <a onClick={onViewDetails}>
        View Details <IconHandler isShown={isShown} />
      </a>
    </HeaderCard.Body>
  </HeaderCard>
);

export default BalanceCard;
