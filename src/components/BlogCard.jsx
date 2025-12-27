const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <h3 className="text-xl font-bold text-gray-800">
        {blog.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        By {blog.author}
      </p>

      <p className="text-gray-600 mt-3 line-clamp-3">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogCard;
