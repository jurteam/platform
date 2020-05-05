import React from "react";
import "./ChartCardTitle.scss";
import { BlockTitle } from "../BlockTitle/BlockTitle";

const ChartCardTitle = ({ children }) => (
  <div className="jur-chart-card-title">
    <BlockTitle title={children} />
  </div>
);

export default ChartCardTitle;
