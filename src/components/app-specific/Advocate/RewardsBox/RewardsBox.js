import React from "react";
import "./RewardsBox.scss";
import Box from "JurCommon/Box";
import RewardsTable from "../RewardsTable";
import RewardsPagination from "../RewardsPagination";

const RewardsBox = () => (
  <Box title="Your Rewards">
    <RewardsTable />
    <RewardsPagination />
  </Box>
);

export default RewardsBox;
