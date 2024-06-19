// src/RechartGraph.js

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RechartGraph = ({ data, line1Name, line2Name, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="line1"
          name={line1Name}
          stroke="#8884d8"
          dot={false}
          isAnimationActive={false}
        />
        {/* <Line
          type="monotone"
          dataKey="line2"
          name={line2Name}
          stroke="#82ca9d"
          dot={false}
          isAnimationActive={false}
        /> */}
      </LineChart>
    </div>
  );
};

export default RechartGraph;
