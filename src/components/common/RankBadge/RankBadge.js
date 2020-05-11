import React from "react";
import "./RankBadge.scss";
import { RankBadgeIcon } from "../Icons";
import RankBadgeSmall from "./RankBadgeSmall";
import RankBadgeHero from "./RankBadgeHero";

const RankBadge = ({ rank, type }) =>
  type === "hero" ? (
    <RankBadgeHero rank={rank} />
  ) : (
    <RankBadgeSmall rank={rank} />
  );

RankBadge.defaultProps = {
  type: "small"
};

export default RankBadge;
