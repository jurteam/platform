import React from "react";
import { NavLink } from "react-router-dom";

import "./RankCard.scss";
import HeaderCard from "JurCommon/HeaderCard";
import RankBadge from "JurCommon/RankBadge";

const RankCard = () => (
  <HeaderCard title="Oath Keeper Rank">
    <HeaderCard.Hero>
      <RankBadge rank={5} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <NavLink to="/oath-keeper/oath-takers">Check Oathkeeping Ranking</NavLink>
    </HeaderCard.Body>
  </HeaderCard>
);
export default RankCard;
