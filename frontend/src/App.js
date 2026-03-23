import React, { useState } from "react";
import axios from "axios";
import StockChart from "./components/StockChart";
import RSIChart from "./components/RSIChart";
import PredictionTable from "./components/PredictionTable";
import MetricsBar from "./components/MetricsBar";

export default function App() {
  const [ticker, setTicker] = useState("GOOGL");
  const [actual, setActual] = useState([]);
  const [predicted, setPredicted] = useState([]);
  const [dates, setDates] = useState([]); // ✅ NEW

  const fetchData = async () => {
    const res = await axios.get(`http://127.0.0.1:5000/predict?ticker=${ticker}`);

    setActual(res.data.actual);
    setPredicted(res.data.predicted);
    setDates(res.data.dates); // ✅ NEW
  };

  const savePrediction = () => {
    if (!predicted || predicted.length === 0) {
      alert("No data to download!");
      return;
    }

    let csv = "Day,Predicted Price\n";

    predicted.forEach((p, i) => {
      csv += `Day ${i + 1},${p.toFixed(2)}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${ticker}_prediction.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-8">

      {/* Header */}
      <div className="flex flex-col items-center mb-8">

        <h1 className="text-4xl font-bold mb-2 text-center">
          Stock Predictor
        </h1>

        <p className="text-gray-400 text-center">
          AI-powered price analysis & 7-day forecast
        </p>

        {/* Search */}
        <div className="flex gap-3 mt-6">
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg w-80 text-center outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock (e.g. AAPL)"
          />
          <button
            onClick={fetchData}
            className="bg-blue-600 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Analyze
          </button>
        </div>

        {/* Quick Buttons */}
        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          {["AAPL", "GOOGL", "MSFT", "TSLA"].map((t) => (
            <button
              key={t}
              onClick={() => setTicker(t)}
              className="bg-slate-700 px-4 py-1 rounded-full hover:bg-slate-600 transition"
            >
              {t}
            </button>
          ))}
        </div>

      </div>

      <MetricsBar actual={actual} />

      <div className="bg-slate-900 p-6 rounded-xl">

        {/* ✅ PASS DATES */}
        <StockChart actual={actual} predicted={predicted} dates={dates} />

        <RSIChart actual={actual} />

        <button
          onClick={savePrediction}
          className="mt-4 bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Download Prediction
        </button>

      </div>

      <PredictionTable predicted={predicted} />

    </div>
  );
}