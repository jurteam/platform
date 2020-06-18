import React from "react";
import "./HeaderBox.scss";

import Cover from "JurCommon/Cover";
import Box from "JurCommon/Box";
import Avatar from "JurCommon/Avatar";
import Text from "JurCommon/Text";
import HolderHeader from "../HolderHeader";
import ArticleButton from "../ArticleButton";
import NonHolderHeader from "../NonHolderHeader";
import ShareStatusButton from "../ShareStatusButton";
import Frame from "JurCommon/Frame";

const HeaderBox = ({ address, country, statusType, createdAt }) => (
  <Box type="hero">
    <Cover className={coverClass(statusType)}>
      <Frame className="jur-cover__top-out">
        <Avatar seed={address} size="xxlarge" variant="rounded" />
      </Frame>
      <Text size="xsmall">{address}</Text>
      {statusType ? (
        <HolderHeader
          country={country}
          statusType={statusType}
          createdAt={createdAt}
        />
      ) : (
        <NonHolderHeader />
      )}
      {statusType ? (
        <ShareStatusButton className="jur-cover__bottom-out" />
      ) : (
        <ArticleButton className="jur-cover__bottom-out" />
      )}
    </Cover>
  </Box>
);

export default HeaderBox;

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
