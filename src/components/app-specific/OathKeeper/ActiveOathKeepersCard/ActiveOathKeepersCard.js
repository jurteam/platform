import React from "react";
import "./ActiveOathKeepersCard.scss";

import ChartCard from "JurCommon/ChartCard";
import Delta from "JurCommon/Delta";
import Row from "JurCommon/Row";
import Text from "JurCommon/Text";
import OathCardEnumFilter from "../OathCardEnumFilter";
import { OATH_KEEPER_FILTER_ACTIVE_OATH_KEEPERS } from "../../../../reducers/types";

const ActiveOathKeepersCard = ({
  value,
  delta,
  graph,
  selectedDuration,
  onEnumFilterChange
}) => (
  <ChartCard>
    <ChartCard.Title>Active Oath Keepers</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Text type="span" className="jur-main-metric">
          {value}
        </Text>
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
  value: state.oathKeeper.activeOathKeepersCard.value,
  delta: state.oathKeeper.activeOathKeepersCard.delta,
  graph: state.oathKeeper.activeOathKeepersCard.graph,
  selectedDuration: state.oathKeeper.activeOathKeepersCard.selectedDuration
});

const onEnumFilterChange = value => ({
  type: OATH_KEEPER_FILTER_ACTIVE_OATH_KEEPERS,
  payload: value
});

const mapDispatchToProps = { onEnumFilterChange };

export default global.connection(
  ActiveOathKeepersCard,
  mapStateToProps,
  mapDispatchToProps
);
