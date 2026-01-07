import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import DayView from "./pages/DayView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/day/:date" element={<DayView />} />
      </Routes>
    </BrowserRouter>
  );
}