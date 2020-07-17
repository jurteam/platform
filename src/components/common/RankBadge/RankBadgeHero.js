import React from "react";
import "./RankBadge.scss";
import { RankBadgeIcon, JurIcon } from "../Icons";

const RankBadgeSmall = ({ rank }) => (
  <div className="jur-rank-badge__hero">
    <RankBadgeIcon />
    <JurIcon fill="white" className="jur-rank-badge__hero-logo" />
    <div class="jur-rank-badge__hero-rank">{rank}</div>
  </div>
);

export default RankBadgeSmall;
