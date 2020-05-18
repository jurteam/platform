import React from "react";
import "./ChartCardLineChart.scss";

import { ResponsiveLine } from "@nivo/line";

const ChartCardLineChart = ({ data }) => (
  <div className="jur-chart-card-line-chart">
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false
      }}
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "set2" }}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableArea={true}
      isInteractive={false}
      enableCrosshair={false}
    />
  </div>
);

ChartCardLineChart.defaultProps = {
  data: [
    {
      id: "japan",
      color: "hsl(166, 70%, 50%)",
      data: [
        { x: 1, y: 254 },
        { x: 2, y: 248 },
        { x: 4, y: 258 },
        { x: 3, y: 253 },
        { x: 5, y: 262 }
      ]
    }
  ]
};

export default ChartCardLineChart;
