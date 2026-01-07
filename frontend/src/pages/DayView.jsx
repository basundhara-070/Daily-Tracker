import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HourGrid from "../components/HourGrid";
import Legend from "../components/Legend";
import DaySummary from "../components/DaySummary";
import { fetchDayLog, saveDayLog } from "../../services/dayLogApi";

export default function DayView() {
  const { date: paramDate } = useParams();

  // Validate date param or fallback to today
  const isValidDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
  const defaultDate = new Date().toISOString().slice(0, 10);
  const date = isValidDate(paramDate) ? paramDate : defaultDate;

  const [hours, setHours] = useState(Array(24).fill("sleep"));
  const [current, setCurrent] = useState("work");
  const [saving, setSaving] = useState(false);

  // Load data when `date` changes
  useEffect(() => {
    fetchDayLog(date).then((data) => {
      if (data?.hours?.length === 24) {
        setHours(data.hours);
      } else {
        setHours(Array(24).fill("sleep")); // reset if no data
      }
    });
  }, [date]);

  // Auto-save on hours change
  useEffect(() => {
    if (!hours) return;

    const timeout = setTimeout(async () => {
      setSaving(true);
      await saveDayLog(date, hours);
      setSaving(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [hours, date]);

  const changeHour = (index) => {
    const updated = [...hours];
    updated[index] = current;
    setHours(updated);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6 max-w-full mx-auto space-y-8">
      <header className="flex justify-between items-center border-b border-zinc-700 pb-3">
        <h2 className="text-3xl font-bold tracking-tight">{date}</h2>
        <span
          className={`text-sm font-medium ${
            saving ? "text-amber-400 animate-pulse" : "text-green-400"
          }`}
          aria-live="polite"
        >
          {saving ? "Saving..." : "Saved"}
        </span>
      </header>

      <section className="bg-zinc-800 rounded-lg p-4 shadow-md">
        <Legend current={current} setCurrent={setCurrent} />
      </section>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2 bg-zinc-800 rounded-lg p-6 shadow-md">
          <HourGrid hours={hours} onChange={changeHour} />
        </section>

        <aside className="bg-zinc-800 rounded-lg p-6 shadow-md">
          <DaySummary hours={hours} />
        </aside>
      </main>
    </div>
  );
}
