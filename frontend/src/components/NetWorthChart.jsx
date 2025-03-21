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
    <ResponsiveContainer
      width="100%"
      height={300}
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
