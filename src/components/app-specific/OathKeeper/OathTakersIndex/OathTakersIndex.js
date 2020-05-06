import React from "react";
import "./OathTakersIndex.scss";

import Col from "JurCommon/Col";
import OathTakerFilters from "../OathTakerFilters";
import OathTakersTable from "../OathTakersTable";
// import OathTakersFooter from "../OathTakersFooter";

const OathTakersIndex = () => (
  <Col>
    <OathTakerFilters />
    <OathTakersTable />
    {/* <OathTakersFooter /> */}
  </Col>
);

export default OathTakersIndex;
