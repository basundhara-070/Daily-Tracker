import { COLORS } from "../constants/colors";

export default function Legend({ current, setCurrent }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(COLORS).map(([key, color]) => (
        <button
          key={key}
          onClick={() => setCurrent(key)}
          className={`px-3 py-1 rounded-full text-sm font-medium text-white transition
            ${current === key ? "ring-2 ring-black scale-105" : "opacity-80"}
          `}
          style={{ backgroundColor: color }}
        >
          {key.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}
