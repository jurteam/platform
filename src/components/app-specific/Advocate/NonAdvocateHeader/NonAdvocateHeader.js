import React from "react";
import "./NonAdvocateHeader.scss";

import Text from "JurCommon/Text";

const NonAdvocateHeader = () => (
  <>
    <Text transform="shout">Hold On!</Text>
    <Text size="xsmall" transform="up">
      Your wallet is not listed as a valid Advocate of the Jur ecosystem
    </Text>
    <Text size="large">
      Do you want to learn more or apply to become an Advocate?
    </Text>
  </>
);
export default NonAdvocateHeader;
