import React from "react";
import "./AdvocateHeader.scss";

import Text from "JurCommon/Text";
import Row from "JurCommon/Row";
import Flag from "JurCommon/Flag";
import Divide from "JurCommon/Divide";
import { LinkedInIcon, GlobeIcon } from "JurCommon/Icons";
import { i18nDateFormat } from "JurUtils/helpers";

const AdvocateHeader = ({ country, activationTime, linkedIn, url }) => (
  <>
    <Text transform="shout">Advocate</Text>
    <Text size="small">Advocate since {i18nDateFormat(activationTime)}</Text>
    <Row align="center">
      <Flag of={country} className="jur-holder-header__flag" />
      <Divide vertical={true} className="color__white" />
      <a
        target="_blank"
        href={linkedIn}
        className="jur-holder-header__linkedIn"
      >
        <LinkedInIcon className="icon-12" />
      </a>
      <Divide vertical={true} className="color__white" />
      <a target="_blank" href={url} className="jur-holder-header__linkedIn">
        <GlobeIcon className="icon-12" />
      </a>
    </Row>
  </>
);
export default AdvocateHeader;
