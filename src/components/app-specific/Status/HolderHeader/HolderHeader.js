import React from "react";
import "./HolderHeader.scss";

import Text from "JurCommon/Text";
import Row from "JurCommon/Row";
import Flag from "JurCommon/Flag";
import Divide from "JurCommon/Divide";
import { LinkedInIcon } from "JurCommon/Icons";
import { i18nDateFormat } from "../../../../utils/helpers";

const HolderHeader = ({ country, statusType, activationTime, linkedIn }) => (
  <>
    <Text transform="shout">{statusType}</Text>
    <Text size="small">Status since {i18nDateFormat(activationTime)}</Text>
    <Row align="center">
      <Flag of={country} />
      <Divide vertical={true} />
      <a
        target="_blank"
        href={linkedIn}
        className="jur-holder-header__linkedIn"
      >
        <LinkedInIcon className="icon-1x" />
      </a>
    </Row>
  </>
);
export default HolderHeader;
