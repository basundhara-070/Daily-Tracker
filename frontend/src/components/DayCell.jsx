import { useNavigate } from "react-router-dom";

function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DayCell({ date }) {
  const navigate = useNavigate();
  const iso = formatDateLocal(date);

  return (
    <div
      onClick={() => navigate(`/day/${iso}`)}
      className="
        h-12 w-12
        flex items-center justify-center
        rounded-md
        cursor-pointer
        bg-zinc-700
        hover:bg-zinc-600
        text-sm font-medium
        text-zinc-100
      "
      title={iso}
    >
      {date.getDate()}
    </div>
  );
}
