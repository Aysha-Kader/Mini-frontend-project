import { useState } from "react";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Why Cooking is Therapy",
      author: "Aysha",
      content:
        "Cooking helps reduce stress and brings joy. The aroma, the colors, and the creativity heal the mind.",
    },
    {
      id: 2,
      title: "Spices that Changed My Cooking",
      author: "Foodie Chef",
      content:
        "Understanding spices is the secret behind great dishes. A pinch can change everything.",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-yellow-100 px-4 py-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Food <span className="text-orange-400">Blogs</span>
        </h1>

        <button
          onClick={() => navigate("/add-blog")}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          + Add Blog
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
