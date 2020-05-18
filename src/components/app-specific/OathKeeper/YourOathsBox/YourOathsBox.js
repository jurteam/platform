import React from "react";
import "./YourOathsBox.scss";

import Box from "JurCommon/Box";
import Text from "JurCommon/Text";
import TakeOathButton from "../TakeOathButton";
import OathsTimelineView from "../OathsTimelineView";

const EmptyMessage = () => (
  <Box>
    <Box type="message">
      <Text>You have not taken any oaths</Text>
    </Box>
    <TakeOathButton type="compact" />
  </Box>
);

const YourOathsBox = ({ oaths, isLoading }) => (
  <Box title="Your Oaths" isLoading={isLoading}>
    {oaths.length ? <OathsTimelineView oaths={oaths} /> : <EmptyMessage />}
  </Box>
);

YourOathsBox.defaultProps = {
  oaths: []
};

export default YourOathsBox;
