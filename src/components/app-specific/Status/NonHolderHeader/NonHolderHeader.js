import React from "react";
import "./NonHolderHeader.scss";

import Text from "JurCommon/Text";

const NonHolderHeader = () => (
  <>
    <Text transform="shout">Hold On!</Text>
    <Text size="xsmall" transform="up">
      Your wallet is not listed as a valid Status holder of the Jur ecosystem
    </Text>
    <Text size="large">
      Do you want to learn more or apply to become a Status?
    </Text>
  </>
);
export default NonHolderHeader;
