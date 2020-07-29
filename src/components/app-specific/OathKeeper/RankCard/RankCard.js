import React from "react";
import { NavLink } from "react-router-dom";

import "./RankCard.scss";
import HeaderCard from "JurCommon/HeaderCard";
import RankBadge from "JurCommon/RankBadge";
import { mapLabelsToProps } from "../../../../utils/helpers";

const RankCard = ({ rank, labels }) => (
  <HeaderCard
    title={labels.oathKeeperRank}
    description={labels.oathKeeperRankCardDesctiption}
  >
    <HeaderCard.Hero>
      <RankBadge rank={rank} type="hero" />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <NavLink
        to="/oath-keeper/oath-takers"
        className="jur-oath-keeper-rank-link"
      >
        {labels.checkOathkeepingRanking}
      </NavLink>
    </HeaderCard.Body>
  </HeaderCard>
);
export default global.connection(RankCard, mapLabelsToProps);
