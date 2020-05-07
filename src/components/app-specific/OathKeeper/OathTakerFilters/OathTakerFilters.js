import React from "react";
import "./OathTakerFilters.scss";

import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import OathTakerStatusFilter from "../OathTakerStatusFilter";
import OathTakerAmountFilter from "../OathTakerAmountFilter";
import OathTakerDateFilter from "../OathTakerDateFilter";
import OathTakerSearch from "../OathTakerSearch";

const OathTakerFilters = ({
  onStatusChange,
  status,
  onAmountChange,
  onDateChange,
  start,
  end,
  onSearchChange
}) => (
  <Row className="jur-safe-margin">
    <OathTakerStatusFilter onChange={onStatusChange} selected={status} />
    <Expand />
    <OathTakerAmountFilter onChange={onAmountChange} />
    <OathTakerDateFilter onChange={onDateChange} start={start} end={end} />
    <OathTakerSearch onChange={onSearchChange} />
  </Row>
);

export default OathTakerFilters;
