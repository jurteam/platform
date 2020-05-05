import React from "react";
import "./ChartCard.scss";

import Col from "JurCommon/Col";

const ChartCard = ({ children }) => (
  <Col className="jur-chart-card">{children}</Col>
);

export default ChartCard;
