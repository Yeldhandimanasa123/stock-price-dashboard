import React from "react";
import {
  LineChart, Line, XAxis, YAxis,
  ResponsiveContainer, CartesianGrid, ReferenceLine
} from "recharts";

export default function RSIChart({ actual }) {

  const calcRSI = (data, period = 14) => {
    let gains = [], losses = [];

    for (let i = 1; i < data.length; i++) {
      let diff = data[i] - data[i - 1];
      gains.push(diff > 0 ? diff : 0);
      losses.push(diff < 0 ? -diff : 0);
    }

    let rsi = [];

    for (let i = period; i < gains.length; i++) {
      let avgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
      let avgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;

      let rs = avgGain / (avgLoss || 1);
      rsi.push(100 - 100 / (1 + rs));
    }

    return rsi.map((v, i) => ({ x: i, rsi: v }));
  };

  const rsiData = calcRSI(actual);

  return (
    <>
      <h3 className="mt-6 mb-2">RSI (14)</h3>

      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={rsiData}>
          <CartesianGrid stroke="#1e293b" />

          <XAxis dataKey="x" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />

          <ReferenceLine y={70} stroke="red" strokeDasharray="3 3" />
          <ReferenceLine y={30} stroke="green" strokeDasharray="3 3" />

          <Line dataKey="rsi" stroke="#f59e0b" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}