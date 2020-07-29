import React from "react";
import "./YourOathsBox.scss";

import Box from "JurCommon/Box";
import Text from "JurCommon/Text";
import TakeOathButton from "../TakeOathButton";
import OathsTimelineView from "../OathsTimelineView";
import { mapLabelsToProps } from "../../../../utils/helpers";

const EmptyMessage = ({ labels }) => (
  <Box>
    <Box type="message">
      <Text>{labels.noOathsTaken}</Text>
    </Box>
    <TakeOathButton type="compact" />
  </Box>
);

const YourOathsBox = ({ oaths, isLoading, labels }) => (
  <Box title={labels.yourOaths} isLoading={isLoading}>
    {oaths.length ? (
      <OathsTimelineView oaths={oaths} />
    ) : (
      <EmptyMessage labels={labels} />
    )}
  </Box>
);

YourOathsBox.defaultProps = {
  oaths: []
};

export default global.connection(YourOathsBox, mapLabelsToProps);
