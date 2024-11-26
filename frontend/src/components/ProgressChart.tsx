import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

interface ProgressChartProps {
  xAxis: string[]; // X-axis data points
  yAxes: { data: number[]; color?: string; label?: string }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ xAxis, yAxes }) => {
  return (
    <LineChart
      xAxis={[{ scaleType: "point", data: xAxis }]}
      series={yAxes.map((yAxis, index) => ({
        data: yAxis.data,
        color: yAxis.color || `hsl(${(index * 360) / yAxes.length}, 70%, 50%)`, // Default color generation
        label: yAxis.label,
      }))}
      height={300}
      sx={(theme) => ({
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: "white",
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: "white",
          },
        },
      })}
    />
  );
};

export default ProgressChart;
