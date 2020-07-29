import React from "react";
import "./AmountStakedCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Row from "JurCommon/Row";
import Amount from "JurCommon/Amount";
import Expand from "JurCommon/Expand";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { oathKeeperAnalytics } from "../../../../utils/helpers";
import { OATH_KEEPER_FETCH_ANALYTICS } from "../../../../reducers/types";

import {
  getAnalytics,
  getGraphAnalytics,
  getAnalyticsMeta,
  getLabels
} from "../../../../sagas/Selectors";

const CARD_NAME = oathKeeperAnalytics.cards.AMOUNT_STAKED;

const AmountStakedCard = ({
  value,
  graph,
  duration,
  onEnumFilterChange,
  labels
}) => (
  <ChartCard className="jur-oath-keeper-analytics-card">
    <ChartCard.Title
      description={labels.oathKeeperAmountStakedDescription}
      hideIcon={true}
    >
      {labels.amountStakedByOathKeeper}
    </ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Amount value={value} />
      </ChartCard.Metric>
      <ChartCard.PieChart data={graph} />
    </Row>
    <Expand />
    <ChartCard.Footer>
      <OathCardEnumFilter selected={duration} onChange={onEnumFilterChange} />
    </ChartCard.Footer>
  </ChartCard>
);

const mapStateToProps = state => ({
  value: getAnalytics(state, CARD_NAME).value,
  graph: getGraphAnalytics(state, CARD_NAME, "pie"),
  duration: getAnalyticsMeta(state, CARD_NAME).duration,
  labels: getLabels(state)
});

const onEnumFilterChange = duration => ({
  type: OATH_KEEPER_FETCH_ANALYTICS,
  card: CARD_NAME,
  payload: { duration }
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  AmountStakedCard,
  mapStateToProps,
  mapDispatchToProps
);
