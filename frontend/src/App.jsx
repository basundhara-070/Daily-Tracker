import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BlogView from "./pages/BlogView";
import BlogEditor from "./pages/BlogEditor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blog-new" element={<BlogEditor />} />
        <Route path="/blog/edit/:id" element={<BlogEditor />} />
        <Route path="/blog/:id" element={<BlogView />} />
      </Routes>
    </BrowserRouter>
  );
}