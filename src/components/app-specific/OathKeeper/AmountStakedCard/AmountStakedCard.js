import React from "react";
import "./AmountStakedCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Row from "JurCommon/Row";
import Amount from "JurCommon/Amount";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { OATH_KEEPER_FILTER_AMOUNT_STAKED } from "../../../../reducers/types";

const AmountStakedCard = ({
  value,
  graph,
  selectedDuration,
  onEnumFilterChange
}) => (
  <ChartCard>
    <ChartCard.Title>Amount Staked By Oath Keeper</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Amount value={value} />
      </ChartCard.Metric>
      <ChartCard.PieChart data={graph} />
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
  value: state.oathKeeper.amountStakedCard.value,
  graph: state.oathKeeper.amountStakedCard.graph,
  selectedDuration: state.oathKeeper.amountStakedCard.selectedDuration
});

const onEnumFilterChange = value => ({
  type: OATH_KEEPER_FILTER_AMOUNT_STAKED,
  payload: value
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  AmountStakedCard,
  mapStateToProps,
  mapDispatchToProps
);
