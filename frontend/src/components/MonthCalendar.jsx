import DayCell from "./DayCell";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthCalendar({ year, month }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="space-y-2">
      {/* Day names */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-zinc-400">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 justify-items-center">
        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} className="h-12 w-12 sm:mx-2" />
        ))}

        {[...Array(daysInMonth)].map((_, i) => (
          <DayCell key={i} date={new Date(year, month, i + 1)} />
        ))}
      </div>
    </div>
  );
}
