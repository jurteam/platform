import React from "react";
import "./ActiveOathKeepersCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Delta from "JurCommon/Delta";
import Row from "JurCommon/Row";
import Text from "JurCommon/Text";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { OATH_KEEPER_FETCH_ANALYTICS } from "../../../../reducers/types";
import { oathKeeperAnalytics } from "../../../../utils/helpers";
import {
  getAnalytics,
  getGraphAnalytics,
  getAnalyticsMeta
} from "../../../../sagas/Selectors";

const CARD_NAME = oathKeeperAnalytics.cards.ACTIVE_OATH_KEEPER;

const ActiveOathKeepersCard = ({
  value,
  delta,
  graph,
  duration,
  onEnumFilterChange
}) => (
  <ChartCard className="jur-oath-keeper-analytics-card">
    <ChartCard.Title>Active Oath Keepers</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Text type="span" className="jur-main-metric">
          {parseInt(value)}
        </Text>
        <Delta value={delta} />
      </ChartCard.Metric>
      <ChartCard.LineChart data={graph} />
    </Row>
    <ChartCard.Footer>
      <OathCardEnumFilter selected={duration} onChange={onEnumFilterChange} />
    </ChartCard.Footer>
  </ChartCard>
);

const mapStateToProps = state => ({
  value: getAnalytics(state, CARD_NAME).value,
  delta: getAnalytics(state, CARD_NAME).delta,
  graph: getGraphAnalytics(state, CARD_NAME),
  duration: getAnalyticsMeta(state, CARD_NAME).duration
});

const onEnumFilterChange = duration => ({
  type: OATH_KEEPER_FETCH_ANALYTICS,
  payload: { duration },
  card: CARD_NAME
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  ActiveOathKeepersCard,
  mapStateToProps,
  mapDispatchToProps
);
