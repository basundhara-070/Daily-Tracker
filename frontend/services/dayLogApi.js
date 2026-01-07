const API_BASE = "https://daily-tracker-5c52.onrender.com/api/daylogs";

export const fetchDayLog = async (date) => {
  const res = await fetch(`${API_BASE}/${date}`);
  return res.json();
};

export const saveDayLog = async (date, hours, notes = "") => {
  const res = await fetch(`${API_BASE}/${date}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hours, notes }),
  });
  return res.json();
};
