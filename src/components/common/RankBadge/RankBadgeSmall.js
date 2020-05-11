import React from "react";
import "./RankBadge.scss";
import { RankBadgeIcon } from "../Icons";

const RankBadgeSmall = ({ rank, type }) =>
  Number(rank) <= 3 ? (
    <div className="jur-rank-badge__small">
      <RankBadgeIcon />
      <div class="jur-rank-badge__small-rank">{rank}</div>
    </div>
  ) : (
    rank
  );

export default RankBadgeSmall;
