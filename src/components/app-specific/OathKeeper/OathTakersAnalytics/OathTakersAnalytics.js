import React, { useEffect } from "react";
import "./OathTakersAnalytics.scss";

import Row from "JurCommon/Row";
import ActiveAmountCard from "../ActiveAmountCard";
import AmountStakedCard from "../AmountStakedCard";
import AverageAmountCard from "../AverageAmountCard";
import ActiveOathKeepersCard from "../ActiveOathKeepersCard";
import { OATH_KEEPER_FETCH_ANALYTICS } from "../../../../reducers/types";

const OathTakersAnalytics = ({ fetchAnalytics }) => {
  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <Row>
      <ActiveAmountCard />
      <AmountStakedCard />
      <AverageAmountCard />
      <ActiveOathKeepersCard />
    </Row>
  );
};

const fetchAnalytics = () => ({ type: OATH_KEEPER_FETCH_ANALYTICS });

const mapDispatchToProps = { fetchAnalytics };

export default global.connection(OathTakersAnalytics, null, mapDispatchToProps);
