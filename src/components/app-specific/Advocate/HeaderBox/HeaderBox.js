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
        <AdvocateHeader
          country={country}
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

const mapStateToProps = state => {
  const isFetching = getAdvocateIsFetching(state);
  if (isFetching) return { isFetching };

  const advocate = getAdvocate(state);

  return {
    isFetching: isFetching,
    country: advocate.country,
    statusType: advocate.statusType,
    activationTime: new Date(advocate.activationTime)
  };
};

export default global.connection(HeaderBox, mapStateToProps);
