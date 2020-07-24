import React from "react";

import "./WalletCard.scss";
import HeaderCard from "JurCommon/HeaderCard";
import Avatar from "JurCommon/Avatar";
import { mapLabelsToProps } from "../../../../utils/helpers";

const shorten = string => string.substring(0, 20) + "…";

const WalletCard = ({ address, labels }) => (
  <HeaderCard
    title="Wallet"
    description={labels.oathKeeperWalletCardDesctiption}
  >
    <HeaderCard.Hero>
      <Avatar seed={address} size="xlarge" variant="rounded" />
    </HeaderCard.Hero>
    <HeaderCard.Body>{shorten(address)}</HeaderCard.Body>
  </HeaderCard>
);

export default global.connection(WalletCard, mapLabelsToProps);
