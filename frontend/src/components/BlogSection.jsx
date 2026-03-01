import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import API from "../services/api";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBlogs = async () => {
    const { data } = await API.get("/blogs");
    setBlogs(data);
  };

  const addBlog = async () => {
    if (!title || !content) return;
    await API.post("/blogs", { title, content });
    setTitle("");
    setContent("");
    setIsModalOpen(false);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="transform transition-all duration-500 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white border-b-2 pb-3 inline-block" style={{borderColor: '#9874d3'}}>Tech Blog</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
          style={{backgroundColor: '#9874d3', boxShadow: '0 0 15px rgba(152, 116, 211, 0.4)'}}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.6)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4)'}
        >
          Add Blogs
        </button>
      </div>

      <div className="space-y-6">
        {blogs.map(blog => (
          <div
            key={blog._id}
            className="border-2 p-6 rounded-xl bg-gray-900 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
            style={{borderColor: '#9874d3', boxShadow: '0 0 15px rgba(152, 116, 211, 0.2)'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(152, 116, 211, 0.4)';
              e.currentTarget.style.backgroundColor = '#2d2d3d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.2)';
              e.currentTarget.style.backgroundColor = '#111827';
            }}
          >
            <h3 className="text-xl font-bold mb-3 text-white">{blog.title}</h3>
            <div
              className="prose prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-96 shadow-2xl max-h-96 overflow-y-auto" style={{borderColor: '#9874d3', border: '2px solid #9874d3', boxShadow: '0 0 40px rgba(152, 116, 211, 0.3)'}}>
            <h3 className="text-2xl font-bold text-white mb-6">Create New Blog</h3>
            
            <div className="space-y-4 mb-6">
              <input
                className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Blog Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
                style={{borderWidth: '2px', borderColor: '#9874d3', boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}}
                onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
              />
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="bg-gray-800 text-gray-100 rounded-lg"
                style={{borderWidth: '2px', borderColor: '#9874d3'}}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTitle("");
                  setContent("");
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={addBlog}
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
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}