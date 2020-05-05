import React from "react";
import "./AverageAmountCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Delta from "JurCommon/Delta";
import Row from "JurCommon/Row";
import Amount from "JurCommon/Amount";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { OATH_KEEPER_FILTER_AVERAGE_AMOUNT } from "../../../../reducers/types";

const AverageAmountCard = ({
  value,
  delta,
  graph,
  selectedDuration,
  onEnumFilterChange
}) => (
  <ChartCard>
    <ChartCard.Title>Average Amount Staked</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Amount value={value} />
        <Delta value={delta} />
      </ChartCard.Metric>
      <ChartCard.LineChart data={graph} />
    </Row>
    <ChartCard.Footer>
      <OathCardEnumFilter
        selected={selectedDuration}
        onChange={onEnumFilterChange}
      />
    </ChartCard.Footer>
  </ChartCard>
);

const mapStateToProps = state => ({
  value: state.oathKeeper.averageAmountCard.value,
  delta: state.oathKeeper.averageAmountCard.delta,
  graph: state.oathKeeper.averageAmountCard.graph,
  selectedDuration: state.oathKeeper.averageAmountCard.selectedDuration
});

const onEnumFilterChange = value => ({
  type: OATH_KEEPER_FILTER_AVERAGE_AMOUNT,
  payload: value
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  AverageAmountCard,
  mapStateToProps,
  mapDispatchToProps
);
