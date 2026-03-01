import NotesSection from "./NotesSection";
import BlogSection from "./BlogSection";
import DSATracker from "./DSATracker";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-12 space-y-20">
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-lg" style={{color: '#9874d3'}}>
          Intellectual Glow-Up Dashboard
        </h1>
        <div className="h-1.5 rounded-full w-64 mx-auto opacity-80 shadow-lg" style={{backgroundColor: '#9874d3', boxShadow: '0 0 20px #9874d3'}}></div>
      </div>

      <NotesSection />
      <BlogSection />
      <DSATracker />
    </div>
  );
}