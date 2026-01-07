import { COLORS } from "../constants/colors";

export default function HourGrid({ hours, onChange }) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {hours.map((activity, i) => (
        <div
          key={i}
          onClick={() => onChange(i)}
          className="h-12 rounded cursor-pointer border flex items-center justify-center text-xs text-white"
          style={{ backgroundColor: COLORS[activity] }}
        >
          {i}:00
        </div>
      ))}
    </div>
  );
}
