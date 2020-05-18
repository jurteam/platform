import React, { useState } from "react";
import "./MyOathsHeaderBox.scss";

import Box from "JurCommon/Box";
import Row from "JurCommon/Row";
import WalletCard from "../WalletCard";
import RankCard from "../RankCard";
import BalanceCard from "../BalanceCard";
import ActiveOathsTable from "../ActiveOathsTable";

const MyOathsHeaderBox = ({ oaths, address, rank, balance }) => {
  const [isShown, setIsShown] = useState(false);
  const toggleDetails = () => setIsShown(!isShown);

  return (
    <Box type="header">
      <Row>
        <WalletCard address={address} />
        <RankCard rank={rank} />
        <BalanceCard
          balance={balance}
          onViewDetails={toggleDetails}
          isShown={isShown}
        />
      </Row>
      <ActiveOathsTable isShown={isShown} oaths={oaths} />
    </Box>
  );
};

export default MyOathsHeaderBox;
