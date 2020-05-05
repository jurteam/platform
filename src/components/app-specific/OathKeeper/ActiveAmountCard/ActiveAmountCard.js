import React from "react";
import "./ActiveAmountCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Delta from "JurCommon/Delta";
import Row from "JurCommon/Row";
import Amount from "JurCommon/Amount";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { OATH_KEEPER_FILTER_ACTIVE_AMOUNT } from "../../../../reducers/types";

const ActiveAmountCard = ({
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
  value: state.oathKeeper.activeAmountCard.value,
  delta: state.oathKeeper.activeAmountCard.delta,
  graph: state.oathKeeper.activeAmountCard.graph,
  selectedDuration: state.oathKeeper.activeAmountCard.selectedDuration
});

const onEnumFilterChange = value => ({
  type: OATH_KEEPER_FILTER_ACTIVE_AMOUNT,
  payload: value
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  ActiveAmountCard,
  mapStateToProps,
  mapDispatchToProps
);
