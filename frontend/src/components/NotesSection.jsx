import { useEffect, useState } from "react";
import API from "../services/api";

export default function NotesSection() {
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState("");
  const [docLink, setDocLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotes = async () => {
    const { data } = await API.get("/notes");
    setNotes(data);
  };

  const addNote = async () => {
    if (!subject || !docLink) return;
    await API.post("/notes", { subject, docLink });
    setSubject("");
    setDocLink("");
    setIsModalOpen(false);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <section className="transform transition-all duration-500 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white border-b-2 pb-3 inline-block" style={{borderColor: '#9874d3', color: '#e5e7eb'}}>Notes</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
          style={{backgroundColor: '#9874d3', boxShadow: '0 0 15px rgba(152, 116, 211, 0.4)', hover: {boxShadow: '0 0 25px rgba(152, 116, 211, 0.6)'}}}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.6)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4)'}
        >
          Add Notes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {notes.map(note => (
          <a
            key={note._id}
            href={note.docLink}
            target="_blank"
            className="border-2 p-5 rounded-xl bg-gray-900 transition-all duration-300 hover:shadow-lg cursor-pointer group"
            style={{borderColor: '#9874d3', boxShadow: '0 0 10px rgba(152, 116, 211, 0.2)'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.5)';
              e.currentTarget.style.backgroundColor = '#2d2d3d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 10px rgba(152, 116, 211, 0.2)';
              e.currentTarget.style.backgroundColor = '#111827';
            }}
          >
            <span className="group-hover:translate-x-1 inline-block transition-transform text-gray-200">{note.subject}</span>
          </a>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-96 shadow-2xl" style={{borderColor: '#9874d3', border: '2px solid #9874d3', boxShadow: '0 0 40px rgba(152, 116, 211, 0.3)'}}>
            <h3 className="text-2xl font-bold mb-6 text-white">Add New Note</h3>
            
            <div className="space-y-4 mb-6">
              <input
                className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                autoFocus
                style={{borderWidth: '2px', borderColor: '#9874d3', boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}}
                onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
              />
              <input
                className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Google Doc Link"
                value={docLink}
                onChange={e => setDocLink(e.target.value)}
                style={{borderWidth: '2px', borderColor: '#9874d3', boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}}
                onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSubject("");
                  setDocLink("");
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={addNote}
                className="flex-1 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                style={{backgroundColor: '#9874d3', boxShadow: '0 0 10px rgba(152, 116, 211, 0.4)'}}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.6)';
                  e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 0 10px rgba(152, 116, 211, 0.4)';
                  e.target.style.opacity = '1';
                }}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}