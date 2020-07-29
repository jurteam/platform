import React from "react";
import "./RewardsBox.scss";
import Box from "JurCommon/Box";
import RewardsTable from "../RewardsTable";
import RewardsPagination from "../RewardsPagination";
import { mapLabelsToProps } from "../../../../utils/helpers";

const RewardsBox = ({ address, name, isPublic, labels }) => (
  <Box title={rewardsTitle(address, name, isPublic, labels)}>
    <RewardsTable address={address} isPublic={isPublic} />
    <RewardsPagination address={address} />
  </Box>
);

function rewardsTitle(address, name, isPublic, labels) {
  if (!isPublic) return labels.yourRewards;
  const display = name || address;
  return display + "'s Rewards";
}

export default global.connection(RewardsBox, mapLabelsToProps);
