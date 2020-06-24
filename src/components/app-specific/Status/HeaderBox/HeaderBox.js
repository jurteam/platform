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
  location,
  linkedIn,
  statusType,
  activationTime
}) => (
  <Box type="hero">
    <Cover className={coverClass(statusType)}>
      <Frame className={frameClass(statusType)}>
        <Avatar
          seed={address}
          size="xxlarge"
          variant="rounded"
          className="jur-frame__pop"
        />
      </Frame>
      <Text size="xsmall">{address}</Text>
      {!isFetching && statusType ? (
        <HolderHeader
          country={location}
          linkedIn={linkedIn}
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

function frameClass(statusType) {
  let className = "jur-cover__top-out ";

  switch (statusType) {
    case "Justinian":
    case "justinian":
      return className + "jur-frame__justinian";
    case "Solomon":
    case "solomon":
      return className + "jur-frame__solomon";
  }

  return className;
}

const mapStateToProps = state => {
  const isFetching = getStatusIsFetching(state);
  if (isFetching) return { isFetching };

  const myStatus = getMyStatus(state);

  return {
    isFetching: isFetching,
    address: getWallet(state).address,
    location: myStatus.attributes.location,
    linkedIn: myStatus.attributes.linkedIn,
    statusType: myStatus.attributes.statusType,
    activationTime: new Date(myStatus.attributes.activationTime)
  };
};

export default global.connection(HeaderBox, mapStateToProps);
