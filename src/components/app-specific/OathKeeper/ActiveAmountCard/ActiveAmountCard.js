import React from "react";
import "./ActiveAmountCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Delta from "JurCommon/Delta";
import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import Amount from "JurCommon/Amount";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { oathKeeperAnalytics } from "../../../../utils/helpers";
import { OATH_KEEPER_FETCH_ANALYTICS } from "../../../../reducers/types";
import {
  getAnalytics,
  getGraphAnalytics,
  getAnalyticsMeta
} from "../../../../sagas/Selectors";

const CARD_NAME = oathKeeperAnalytics.cards.ACTIVE_AMOUNT;

const ActiveAmountCard = ({
  duration,
  value,
  delta,
  graph,
  onEnumFilterChange
}) => {
  return (
    <ChartCard className="jur-oath-keeper-analytics-card">
      <ChartCard.Title>Active Amount Staked</ChartCard.Title>
      <Row>
        <ChartCard.Metric>
          <Amount value={value} />
          <Delta value={delta} />
        </ChartCard.Metric>
        <ChartCard.LineChart data={graph} />
      </Row>
      <Expand />
      <ChartCard.Footer>
        <OathCardEnumFilter selected={duration} onChange={onEnumFilterChange} />
      </ChartCard.Footer>
    </ChartCard>
  );
};

const mapStateToProps = state => ({
  analytics: getAnalytics(state, CARD_NAME),
  value: getAnalytics(state, CARD_NAME).value,
  delta: getAnalytics(state, CARD_NAME).delta,
  graph: getGraphAnalytics(state, CARD_NAME),
  meta: getAnalyticsMeta(state, CARD_NAME),
  duration: getAnalyticsMeta(state, CARD_NAME).duration
});

const onEnumFilterChange = duration => ({
  type: OATH_KEEPER_FETCH_ANALYTICS,
  payload: { duration },
  card: CARD_NAME
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  ActiveAmountCard,
  mapStateToProps,
  mapDispatchToProps
);
