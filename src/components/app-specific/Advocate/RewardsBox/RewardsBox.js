import React from "react";
import "./RewardsBox.scss";
import Box from "JurCommon/Box";
import RewardsTable from "../RewardsTable";
import RewardsPagination from "../RewardsPagination";

const RewardsBox = ({ address }) => (
  <Box title="Your Rewards">
    <RewardsTable address={address} />
    <RewardsPagination address={address} />
  </Box>
);

export default RewardsBox;
