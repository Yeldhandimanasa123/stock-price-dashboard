import React from "react";

export default function MetricsBar({ actual }) {

  if (!actual || actual.length === 0) return null;

  const current = actual[actual.length - 1];
  const prev = actual[actual.length - 2];

  const change = ((current - prev) / prev) * 100;

  const high = Math.max(...actual);
  const low = Math.min(...actual);

  const avgVolume = "OK"; // placeholder (backend can add later)

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">

      <Card title="Current Price" value={`$${current.toFixed(2)}`} />

      <Card
        title="Daily Change"
        value={`${change.toFixed(2)}%`}
        color={change > 0 ? "text-green-400" : "text-red-400"}
      />

      <Card title="52W High" value={`$${high.toFixed(2)}`} />

      <Card title="52W Low" value={`$${low.toFixed(2)}`} />

      <Card title="Avg Volume" value={avgVolume} />

      <Card title="Data Points" value={actual.length} />

    </div>
  );
}

function Card({ title, value, color = "text-white" }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-md">

      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className={`text-xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}