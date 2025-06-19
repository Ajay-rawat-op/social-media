import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Trash2, Pencil, CalendarDays, UserCircle, X } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SinglePost = () => {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/getSinglePost?postID=${postID}`);
      setPost(response.data.responseData);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePost = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      const response = await axios.delete(`${BACKEND_URL}/deletePost`, {
        data: { postID },
      });
      if (response.data.responseData) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="relative max-w-3xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 border border-gray-200 dark:border-gray-700">

        {/* Cross Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {post ? (
          <>
            {/* Topic */}
            <p className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide block mb-4 break-words line-clamp-2 overflow-hidden text-ellipsis max-w-full">
              {post.topic}
            </p>

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 break-words line-clamp-3 overflow-hidden text-ellipsis">
              {post.question}
            </h1>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap break-words line-clamp-6 overflow-hidden text-ellipsis">
              {post.answer}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t pt-4 mt-4 gap-2">
              <div className="flex items-center gap-2">
                <UserCircle size={18} />
                <span>{post.author || "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={deletePost}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow transition"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={() => navigate(`/updatePost/${postID}`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition"
              >
                <Pencil size={16} /> Edit
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading post...</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
