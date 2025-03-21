import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NetWorthChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with API fetch or Ledger CLI parsing
    const fetchData = async () => {
      const mockData = [
        { date: "2025-01", netWorth: 10000 },
        { date: "2025-02", netWorth: 12000 },
        { date: "2025-03", netWorth: 9000 },
        { date: "2025-04", netWorth: 11000 },
        { date: "2025-05", netWorth: 13000 },
        { date: "2025-06", netWorth: 10000 },
        { date: "2025-07", netWorth: 14000 },
        { date: "2025-08", netWorth: 12000 },
        { date: "2025-09", netWorth: 15000 },
        { date: "2025-10", netWorth: 11000 },
        { date: "2025-11", netWorth: 16000 },
        { date: "2025-12", netWorth: 14000 },
      ];
      setData(mockData);
    };
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" strokeWidth={2} />
        <YAxis strokeWidth={2} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="netWorth"
          stroke="#2B7FFF"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NetWorthChart;
