import React from "react";
import "./BalancesBox.scss";

import Box from "JurCommon/Box";
import Row from "JurCommon/Row";
import RewardsCard from "./RewardsCard";
import EarnedCard from "./EarnedCard";
import AvailableCard from "./AvailableCard";

const BalancesBox = ({
  rewardsBalance,
  totalEarned,
  totalAvailable,
  isShown,
  isPublic,
  toggleDetails
}) => (
  <Box type="subheader">
    <Row>
      <RewardsCard balance={rewardsBalance} />
      <EarnedCard balance={totalEarned} />
      {isPublic ? null : (
        <AvailableCard
          balance={totalAvailable}
          isShown={isShown}
          onViewDetails={toggleDetails}
        />
      )}
    </Row>
  </Box>
);

export default BalancesBox;
