import React from "react";
import "./HeaderBox.scss";
import {
  getWallet,
  getAdvocate,
  getAdvocateIsFetching
} from "../../../../sagas/Selectors";

import Cover from "JurCommon/Cover";
import Box from "JurCommon/Box";
import Avatar from "JurCommon/Avatar";
import Text from "JurCommon/Text";
import AdvocateHeader from "../AdvocateHeader";
import ArticleButton from "../ArticleButton";
import NonAdvocateHeader from "../NonAdvocateHeader";
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
        <AdvocateHeader
          country={location}
          linkedIn={linkedIn}
          statusType={statusType}
          activationTime={activationTime}
        />
      ) : (
        <NonAdvocateHeader />
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
  const isFetching = getAdvocateIsFetching(state);
  if (isFetching) return { isFetching };

  const advocate = getAdvocate(state);

  return {
    isFetching: isFetching,
    statusType: advocate.statusType,
    activationTime: new Date(advocate.activationTime),
    address: getWallet(state).address,
    location: advocate.location,
    linkedIn: advocate.linkedIn
  };
};

export default global.connection(HeaderBox, mapStateToProps);
