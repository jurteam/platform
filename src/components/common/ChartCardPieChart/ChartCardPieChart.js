import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./ChartCardPieChart.scss";

const ChartCardPieChart = ({ data }) => (
  <div className="jur-chart-card-line-chart">
    <ResponsivePie
      data={data}
      innerRadius={0.8}
      colors={{ scheme: "set2" }}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      enableRadialLabels={false}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      enableSlicesLabels={false}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
);

ChartCardPieChart.defaultProps = {
  data: [
    {
      id: "0x7tytytytydisjsn",
      value: 331
    },
    {
      id: "0x262673732782",
      value: 231
    },
    {
      id: "0x87428hdvbhvseui",
      value: 631
    },
    {
      id: "0x5baerrvvus498",
      value: 731
    }
  ]
};

export default ChartCardPieChart;
