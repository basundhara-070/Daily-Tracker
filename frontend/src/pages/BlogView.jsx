import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get("/blogs");
        const foundBlog = data.find(b => b._id === id);
        setBlog(foundBlog);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Blog not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 text-white rounded-lg font-semibold transition-all duration-300"
            style={{backgroundColor: '#9874d3'}}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <button
        onClick={() => navigate("/")}
        className="mb-8 px-4 py-2 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        style={{backgroundColor: '#9874d3', boxShadow: '0 0 10px rgba(152, 116, 211, 0.4)'}}
      >
        ← Back to Home
      </button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4 pb-4 border-b-2"
            style={{borderColor: '#9874d3'}}
          >
            {blog.title}
          </h1>
          <p className="text-gray-400 text-sm">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </header>

        <div
          className="prose prose-invert max-w-none"
          style={{
            '--tw-prose-p': '#e5e7eb',
            '--tw-prose-a': '#9874d3',
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
}
