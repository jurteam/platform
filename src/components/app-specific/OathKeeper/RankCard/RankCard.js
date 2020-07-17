import React from "react";
import { NavLink } from "react-router-dom";

import "./RankCard.scss";
import HeaderCard from "JurCommon/HeaderCard";
import RankBadge from "JurCommon/RankBadge";

const RankCard = ({ rank }) => (
  <HeaderCard title="Oath Keeper Rank">
    <HeaderCard.Hero>
      <RankBadge rank={rank} type="hero" />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <NavLink
        to="/oath-keeper/oath-takers"
        className="jur-oath-keeper-rank-link"
      >
        Check Oathkeeping Ranking
      </NavLink>
    </HeaderCard.Body>
  </HeaderCard>
);
export default RankCard;
