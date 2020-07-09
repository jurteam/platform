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
  isAdvocate,
  isFetching,
  address,
  country,
  linkedIn,
  url,
  statusType,
  activationTime
}) => (
  <Box types="hero spread">
    <Cover className={coverClass(statusType, isAdvocate)}>
      <Frame className={frameClass(statusType, isAdvocate)}>
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
          country={country}
          linkedIn={linkedIn}
          url={url}
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

function coverClass(statusType, isAdvocate) {
  if (isAdvocate) return "jur-cover__advocate";

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

function frameClass(statusType, isAdvocate) {
  let className = "jur-cover__top-out ";
  if (isAdvocate) return className + "jur-frame__advocate";

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
    country: advocate.country,
    linkedIn: advocate.linkedIn,
    url: advocate.url
  };
};

export default global.connection(HeaderBox, mapStateToProps);
