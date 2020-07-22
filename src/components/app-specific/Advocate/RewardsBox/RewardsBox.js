import React from "react";
import "./RewardsBox.scss";
import Box from "JurCommon/Box";
import RewardsTable from "../RewardsTable";
import RewardsPagination from "../RewardsPagination";

const RewardsBox = ({ address, name, isPublic }) => (
  <Box title={rewardsTitle(address, name, isPublic)}>
    <RewardsTable address={address} isPublic={isPublic} />
    <RewardsPagination address={address} />
  </Box>
);

function rewardsTitle(address, name, isPublic) {
  if (!isPublic) return "Your Rewards";
  const display = name || address;
  return display + "'s Rewards";
}

export default RewardsBox;
