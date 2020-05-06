import React from "react";
import "./OathTakerFilters.scss";

import Row from "JurCommon/Row";
import Expand from "JurCommon/Empty";
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
  <Row>
    <OathTakerStatusFilter onChange={onStatusChange} selected={status} />
    <Expand />
    <OathTakerAmountFilter onChange={onAmountChange} />
    <OathTakerDateFilter onChange={onDateChange} start={start} end={end} />
    <OathTakerSearch onChange={onSearchChange} />
  </Row>
);

export default OathTakerFilters;
