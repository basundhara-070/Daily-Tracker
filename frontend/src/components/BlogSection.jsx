import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const { data } = await API.get("/blogs");
    setBlogs(data);
  };

  const handleAddBlog = () => {
    navigate("/blog-new");
  };

  const handleEditBlog = (blog) => {
    navigate(`/blog/edit/${blog._id}`);
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await API.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        console.error("Error deleting blog:", err);
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="transform transition-all duration-500 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white border-b-2 pb-3 inline-block" style={{borderColor: '#9874d3'}}>Tech Blog</h2>
        <button
          onClick={handleAddBlog}
          className="px-5 py-2.5 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
          style={{backgroundColor: '#9874d3', boxShadow: '0 0 15px rgba(152, 116, 211, 0.4)'}}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.6)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4)'}
        >
          Add Blogs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div
            key={blog._id}
            className="border-2 p-6 rounded-xl bg-gray-900 backdrop-blur-sm transition-all duration-300 hover:shadow-xl group cursor-pointer relative"
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
            <h3 
              className="text-xl font-bold text-white line-clamp-3 cursor-pointer hover:text-purple-400 transition-colors duration-300 min-h-16"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              {blog.title}
            </h3>

            {/* Icons at bottom left */}
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditBlog(blog);
                }}
                className="p-1.5 border-2 border-yellow-500 text-yellow-500 rounded-lg transition-all duration-300 hover:bg-yellow-500 hover:text-gray-900"
                title="Edit"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBlog(blog._id);
                }}
                className="p-1.5 border-2 border-red-500 text-red-500 rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white"
                title="Delete"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}