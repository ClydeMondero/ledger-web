import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const NetWorthChart = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      minHeight="200px"
      className="bg-blue-50 p-4 rounded-lg"
    >
      <LineChart data={data}>
        <XAxis dataKey="date" strokeWidth={2} />
        <YAxis strokeWidth={2} />
        <Tooltip
          content={(props) => {
            const { payload } = props;
            if (!payload || !payload.length) return null;
            const { date, netWorth } = payload[0].payload;
            return (
              <div className="bg-blue-100 p-4 rounded-lg">
                <span className="text-lg font-medium text-blue-500">
                  ₱ {netWorth.toLocaleString()}
                </span>
                <br />
                <span className="text-md text-blue-400">{date}</span>
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="netWorth"
          stroke="#2B7FFF"
          strokeWidth={3}
        />
        <CartesianGrid stroke="#2B7FFF" strokeDasharray="1 5" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NetWorthChart;
