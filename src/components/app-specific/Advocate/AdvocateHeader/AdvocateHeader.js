import React from "react";
import "./AdvocateHeader.scss";

import Text from "JurCommon/Text";
import Row from "JurCommon/Row";
import Flag from "JurCommon/Flag";
import Divide from "JurCommon/Divide";
import { LinkedInIcon, GlobeIcon } from "JurCommon/Icons";
import { i18nDateFormatSec } from "JurUtils/helpers";
import { mapLabelsToProps } from "../../../../utils/helpers";

const AdvocateHeader = ({ country, activationTime, linkedIn, url, labels }) => (
  <>
    <Text transform="shout">{labels.advocate}</Text>
    <Text size="small">Advocate since {i18nDateFormatSec(activationTime)}</Text>
    <Row align="center" className="jur-holder-header__links">
      {country ? (
        <Flag of={country} className="jur-holder-header__flag" />
      ) : null}
      {linkedIn ? (
        <>
          {country ? <Divide vertical={true} className="color__white" /> : null}
          <a
            target="_blank"
            href={linkedIn}
            className="jur-holder-header__linkedIn"
          >
            <LinkedInIcon className="icon-12" />
          </a>
        </>
      ) : null}
      {url ? (
        <>
          {linkedIn || country ? (
            <Divide vertical={true} className="color__white" />
          ) : null}
          <a target="_blank" href={url} className="jur-holder-header__linkedIn">
            <GlobeIcon className="icon-12" />
          </a>
        </>
      ) : null}
    </Row>
  </>
);
export default global.connection(AdvocateHeader, mapLabelsToProps);
