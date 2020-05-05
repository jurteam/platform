import React from "react";
import "./OathTakersAnalytics.scss";

import Row from "JurCommon/Row";
import ActiveAmountCard from "../ActiveAmountCard";
import AmountStakedCard from "../AmountStakedCard";
import AverageAmountCard from "../AverageAmountCard";
import ActiveOathKeepersCard from "../ActiveOathKeepersCard";

const OathTakersAnalytics = () => (
  <Row>
    <ActiveAmountCard />
    <AmountStakedCard />
    <AverageAmountCard />
    <ActiveOathKeepersCard />
  </Row>
);
export default OathTakersAnalytics;
