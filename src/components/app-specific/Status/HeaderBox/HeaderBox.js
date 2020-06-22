import React from "react";
import "./HeaderBox.scss";
import {
  getWallet,
  getMyStatus,
  getStatusIsFetching
} from "../../../../sagas/Selectors";

import Cover from "JurCommon/Cover";
import Box from "JurCommon/Box";
import Avatar from "JurCommon/Avatar";
import Text from "JurCommon/Text";
import HolderHeader from "../HolderHeader";
import ArticleButton from "../ArticleButton";
import NonHolderHeader from "../NonHolderHeader";
import ShareStatusButton from "../ShareStatusButton";
import Frame from "JurCommon/Frame";

const HeaderBox = ({
  isFetching,
  address,
  country,
  statusType,
  activationTime
}) => (
  <Box type="hero">
    <Cover className={coverClass(statusType)}>
      <Frame className="jur-cover__top-out">
        <Avatar seed={address} size="xxlarge" variant="rounded" />
      </Frame>
      <Text size="xsmall">{address}</Text>
      {!isFetching && statusType ? (
        <HolderHeader
          country={country}
          statusType={statusType}
          activationTime={activationTime}
        />
      ) : (
        <NonHolderHeader />
      )}
      {!isFetching && statusType ? (
        <ShareStatusButton className="jur-cover__bottom-out" />
      ) : (
        <ArticleButton className="jur-cover__bottom-out" />
      )}
    </Cover>
  </Box>
);

function coverClass(statusType) {
  switch (statusType) {
    case "Justinian":
    case "justinian":
      return "jur-cover__justinian";
    case "Solomon":
    case "solomon":
      return "jur-cover__solomon";
    default:
      return "";
  }
}

const mapStateToProps = state => {
  const isFetching = getStatusIsFetching(state);
  if (isFetching) return { isFetching };

  const myStatus = getMyStatus(state);

  return {
    isFetching: isFetching,
    address: getWallet(state).address,
    country: myStatus.attributes.country,
    statusType: myStatus.attributes.statusType,
    activationTime: new Date(myStatus.attributes.activationTime)
  };
};

export default global.connection(HeaderBox, mapStateToProps);
