import MonthCarousel from "../components/MonthCarousel";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-zinc-900 flex justify-center text-zinc-100">
      <div className="w-full max-w-5xl p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            2026 Life Tracker
          </h1>
          <p className="text-sm text-zinc-400">
            Track how you spend every hour of your year
          </p>
        </div>

        <MonthCarousel />
      </div>
    </div>
  );
}
