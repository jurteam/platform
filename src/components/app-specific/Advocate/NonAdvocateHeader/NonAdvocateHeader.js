import React from "react";
import "./NonAdvocateHeader.scss";

import Text from "JurCommon/Text";
import { mapLabelsToProps } from "../../../../utils/helpers";

const NonAdvocateHeader = ({ labels }) => (
  <>
    <Text transform="shout">{labels.holdOn}</Text>
    <Text size="xsmall" transform="up">
      {labels.nonAdvocateDescription}
    </Text>
    <Text size="large">{labels.learnAboutAdvocate}</Text>
  </>
);
export default global.connection(NonAdvocateHeader, mapLabelsToProps);
