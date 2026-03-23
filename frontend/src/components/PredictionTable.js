export default function PredictionTable({ predicted }) {

  if (!predicted || predicted.length === 0) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-xl mt-6 shadow-lg">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">📊 7-Day Forecast</h2>
        <span className="text-sm text-gray-400">Predicted Prices</span>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-700">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-slate-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Price ($)</th>
              <th className="p-3 text-left">Change</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {predicted.map((price, i) => {

              const prev = i === 0 ? price : predicted[i - 1];
              const change = price - prev;
              const percent = (change / prev) * 100;

              return (
                <tr
                  key={i}
                  className="border-t border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="p-3 font-medium">Day {i + 1}</td>

                  <td className="p-3 text-blue-400 font-semibold">
                    ${price.toFixed(2)}
                  </td>

                  <td
                    className={`p-3 font-medium ${
                      change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(2)} ({percent.toFixed(2)}%)
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
}