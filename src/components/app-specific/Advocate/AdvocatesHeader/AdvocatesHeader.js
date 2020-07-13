import React from "react";
import "./AdvocatesHeader.scss";

import Text from "JurCommon/Text";
import Row from "JurCommon/Row";
import Col from "JurCommon/Col";
import AdvocatesSearchInput from "../AdvocatesSearchInput";

const AdvocatesHeader = () => (
  <Row>
    <Col>
      <Text size="large" transform="header">
        Advocates
      </Text>
      <Text>
        This is the list of active Jur Advocates licenses that are co-creating
        the Jur legal automation framework
      </Text>
    </Col>
    <Col>
      <AdvocatesSearchInput />
    </Col>
  </Row>
);
export default AdvocatesHeader;
