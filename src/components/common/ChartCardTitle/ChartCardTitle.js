import React from "react";
import "./ChartCardTitle.scss";
import { BlockTitle } from "../BlockTitle/BlockTitle";

const ChartCardTitle = ({ children, description, hideIcon }) => (
  <div className="jur-chart-card-title">
    <BlockTitle
      title={children}
      reverse={true}
      description={description}
      hideIcon={hideIcon}
    />
  </div>
);

export default ChartCardTitle;
