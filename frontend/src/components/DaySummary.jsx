import { COLORS } from "../constants/colors";

export default function DaySummary({ hours }) {
  const summary = hours.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const productive = ["work", "learning", "extra", "exercise"];
  const productiveHours = productive.reduce(
    (sum, key) => sum + (summary[key] || 0),
    0
  );

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow space-y-3">
      <h2 className="text-lg font-semibold">📊 Day Summary</h2>

      <div className="space-y-2">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[key] }}
              />
              <span className="capitalize">{key}</span>
            </div>
            <span className="font-medium">{value}h</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t text-sm">
        <p>
          ✅ Productive Hours:{" "}
          <span className="font-semibold">{productiveHours}h</span>
        </p>
        <p>
          ❌ Non-productive Hours:{" "}
          <span className="font-semibold">
            {24 - productiveHours}h
          </span>
        </p>
      </div>
    </div>
  );
}
