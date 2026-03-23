import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Area
} from "recharts";

export default function StockChart({ actual, predicted, dates }) {

  // --- Moving Average ---
  const MA = (data, period = 20) =>
    data.map((_, i) =>
      i < period ? null :
      data.slice(i - period, i).reduce((a, b) => a + b, 0) / period
    );

  // --- Standard Deviation ---
  const STD = (data, ma, period = 20) =>
    data.map((_, i) => {
      if (i < period) return null;
      const slice = data.slice(i - period, i);
      const mean = ma[i];
      return Math.sqrt(
        slice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / period
      );
    });

  const ma20 = MA(actual);
  const std = STD(actual, ma20);

  const upper = ma20.map((m, i) =>
    m && std[i] ? m + 2 * std[i] : null
  );

  const lower = ma20.map((m, i) =>
    m && std[i] ? m - 2 * std[i] : null
  );

  // --- Merge Data ---
  const data = [];

  actual.forEach((price, i) => {
    data.push({
      date: dates[i],
      actual: price,
      ma20: ma20[i],
      upper: upper[i],
      lower: lower[i],
      predicted: null
    });
  });

  predicted.forEach((price, i) => {
    data.push({
      date: `Future ${i + 1}`,
      predicted: price,
      actual: null,
      ma20: null,
      upper: null,
      lower: null
    });
  });

  return (
    <>
      <h2 className="mb-4 text-lg text-gray-300">
        Price History & Forecast
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>

          {/* Grid */}
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            stroke="#94a3b8"
            tickFormatter={(v) => `₹${v.toFixed(0)}`}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #334155"
            }}
            formatter={(v) => `₹${v.toFixed(2)}`}
          />

          {/* --- Bollinger Bands --- */}
          <Line
            dataKey="upper"
            stroke="#64748b"
            strokeDasharray="4 4"
            dot={false}
            name="BB Upper"
          />

          <Line
            dataKey="lower"
            stroke="#64748b"
            strokeDasharray="4 4"
            dot={false}
            name="BB Lower"
          />

          {/* --- Moving Average --- */}
          <Line
            dataKey="ma20"
            stroke="#a78bfa"
            dot={false}
            strokeWidth={2}
            name="MA 20"
          />

          {/* --- Actual Price --- */}
          <Line
            dataKey="actual"
            stroke="#3b82f6"
            dot={false}
            strokeWidth={2}
            name="Historical"
          />

          {/* --- Predicted --- */}
          <Line
            dataKey="predicted"
            stroke="#22c55e"
            strokeDasharray="6 4"
            dot={false}
            strokeWidth={2}
            name="Predicted"
          />

        </LineChart>
      </ResponsiveContainer>
    </>
  );
}