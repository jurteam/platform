import React from "react";
import "./OathTakerFilters.scss";

import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import OathTakerStatusFilter from "../OathTakerStatusFilter";
import OathTakerAmountFilter from "../OathTakerAmountFilter";
import OathTakerDateFilter from "../OathTakerDateFilter";
import OathTakerSearch from "../OathTakerSearch";
import { OATH_KEEPER_FETCH_OATH_TAKERS } from "../../../../reducers/types";

const OathTakerFilters = ({
  onStatusChange,
  onAmountChange,
  onDateChange,
  onSearchChange
}) => (
  <Row className="jur-safe-margin">
    <OathTakerStatusFilter onChange={onStatusChange} />
    <Expand />
    <OathTakerAmountFilter onChange={onAmountChange} />
    <OathTakerDateFilter onChange={onDateChange} />
    <OathTakerSearch onChange={onSearchChange} />
  </Row>
);

const mapStateToProps = state => ({ ...state.oathKeeper.oathTakerFilters });

const onStatusChange = ({ value }) => ({
  type: OATH_KEEPER_FETCH_OATH_TAKERS,
  payload: { filter: { status: value } }
});

const onAmountChange = (minAmount, maxAmount) => ({
  type: OATH_KEEPER_FETCH_OATH_TAKERS,
  payload: { filter: { minAmount, maxAmount } }
});

const onDateChange = (startsAt, endsAt) => ({
  type: OATH_KEEPER_FETCH_OATH_TAKERS,
  payload: { filter: { startsAt, endsAt } }
});

const onSearchChange = query => ({
  type: OATH_KEEPER_FETCH_OATH_TAKERS,
  payload: { filter: { query } }
});

const mapDispatchToProps = {
  onStatusChange,
  onDateChange,
  onSearchChange,
  onAmountChange
};

export default global.connection(
  OathTakerFilters,
  mapStateToProps,
  mapDispatchToProps
);
