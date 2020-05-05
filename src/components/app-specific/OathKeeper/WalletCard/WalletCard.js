import React from "react";

import "./WalletCard.scss";
import HeaderCard from "JurCommon/HeaderCard";
import Avatar from "JurCommon/Avatar";

const shorten = string => string.substring(20) + "…";

const WalletCard = ({ address }) => (
  <HeaderCard title="Wallet">
    <HeaderCard.Hero>
      <Avatar seed={address} size="xlarge" variant="rounded" />
    </HeaderCard.Hero>
    <HeaderCard.Body>{shorten(address)}</HeaderCard.Body>
  </HeaderCard>
);

export default WalletCard;
