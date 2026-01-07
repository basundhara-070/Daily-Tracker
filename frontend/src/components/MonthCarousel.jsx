import MonthCalendar from "./MonthCalendar";
import { useState } from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function MonthCarousel() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-3 py-1 rounded hover:bg-zinc-700 text-zinc-300"
          onClick={() => setCurrent((current + 11) % 12)}
        >
          ◀
        </button>

        <h2 className="text-lg font-semibold">
          {months[current]} 2026
        </h2>

        <button
          className="px-3 py-1 rounded hover:bg-zinc-700 text-zinc-300"
          onClick={() => setCurrent((current + 1) % 12)}
        >
          ▶
        </button>
      </div>

      <MonthCalendar year={2026} month={current} />
    </div>
  );
}
