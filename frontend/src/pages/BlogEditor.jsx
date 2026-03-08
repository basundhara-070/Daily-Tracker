import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import API from "../services/api";

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(!!id);
  const [isSaving, setIsSaving] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    const fetchBlog = async () => {
      if (!isEditMode) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await API.get("/blogs");
        const foundBlog = data.find(b => b._id === id);
        if (foundBlog) {
          setTitle(foundBlog.title);
          setContent(foundBlog.content);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, isEditMode]);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    setIsSaving(true);
    try {
      if (isEditMode) {
        await API.put(`/blogs/${id}`, { title, content });
        navigate(`/blog/${id}`);
      } else {
        const { data } = await API.post("/blogs", { title, content });
        navigate(`/blog/${data._id}`);
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Error saving blog. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            style={{backgroundColor: '#9874d3', boxShadow: '0 0 10px rgba(152, 116, 211, 0.4)'}}
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold">{isEditMode ? "Edit Blog" : "Create New Blog"}</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Blog Title</label>
            <input
              type="text"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-4 rounded-lg focus:outline-none transition-all duration-300"
              style={{
                borderWidth: '2px',
                borderColor: '#9874d3',
                boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
              onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Blog Content</label>
            <div className="bg-gray-800 rounded-lg overflow-hidden" style={{borderWidth: '2px', borderColor: '#9874d3'}}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Start writing your blog..."
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, 4, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#9874d3',
                boxShadow: '0 0 10px rgba(152, 116, 211, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!isSaving) {
                  e.target.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.6)';
                  e.target.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSaving) {
                  e.target.style.boxShadow = '0 0 10px rgba(152, 116, 211, 0.4)';
                  e.target.style.opacity = '1';
                }
              }}
            >
              {isSaving ? "Saving..." : isEditMode ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
