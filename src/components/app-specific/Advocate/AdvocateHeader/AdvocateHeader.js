import React from "react";
import "./AdvocateHeader.scss";

import Text from "JurCommon/Text";
import Row from "JurCommon/Row";
import Flag from "JurCommon/Flag";
import Divide from "JurCommon/Divide";
import { LinkedInIcon } from "JurCommon/Icons";
import { i18nDateFormat } from "JurUtils/helpers";

const AdvocateHeader = ({ country, activationTime, linkedIn }) => (
  <>
    <Text transform="shout">Advocate</Text>
    <Text size="small">Advocate since {i18nDateFormat(activationTime)}</Text>
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
      <Divide vertical={true} />
      🌐
    </Row>
  </>
);
export default AdvocateHeader;
