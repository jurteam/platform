import React from "react";
import "./ChartCard.scss";

import Col from "JurCommon/Col";

const ChartCard = ({ children, className }) => (
  <Col className={`jur-chart-card ${className}`}>{children}</Col>
);

export default ChartCard;
