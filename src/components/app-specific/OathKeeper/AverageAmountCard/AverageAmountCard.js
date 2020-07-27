import React from "react";
import "./AverageAmountCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Delta from "JurCommon/Delta";
import Row from "JurCommon/Row";
import Amount from "JurCommon/Amount";
import Expand from "JurCommon/Expand";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { OATH_KEEPER_FETCH_ANALYTICS } from "../../../../reducers/types";
import { oathKeeperAnalytics } from "../../../../utils/helpers";
import {
  getAnalytics,
  getGraphAnalytics,
  getAnalyticsMeta,
  getLabels
} from "../../../../sagas/Selectors";

const CARD_NAME = oathKeeperAnalytics.cards.AVERAGE_AMOUNT;

const AverageAmountCard = ({
  value,
  delta,
  graph,
  duration,
  onEnumFilterChange,
  labels
}) => (
  <ChartCard className="jur-oath-keeper-analytics-card">
    <ChartCard.Title description={labels.oathKeeperAverageAmountDescription}>
      Average Amount Staked
    </ChartCard.Title>
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

const mapStateToProps = state => ({
  value: getAnalytics(state, CARD_NAME).value,
  delta: getAnalytics(state, CARD_NAME).delta,
  graph: getGraphAnalytics(state, CARD_NAME),
  duration: getAnalyticsMeta(state, CARD_NAME).duration,
  labels: getLabels(state)
});

const onEnumFilterChange = duration => ({
  type: OATH_KEEPER_FETCH_ANALYTICS,
  payload: { duration },
  card: CARD_NAME
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  AverageAmountCard,
  mapStateToProps,
  mapDispatchToProps
);
