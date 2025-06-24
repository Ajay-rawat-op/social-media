import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { motion } from "framer-motion";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/getAllposts`);
      setPosts(response.data.responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Optional: Filter posts by search term
  const filteredPosts = posts.filter((post) =>
    post.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 relative">
      <div className="max-w-7xl mx-auto animate-fade-slide-in">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex flex-wrap justify-center gap-2">
            <span className="inline-block animate-from-left">🏡</span>
            <span className="inline-block animate-from-top">Welcome</span>
            <span className="inline-block animate-from-bottom">to</span>
            <span className="inline-block animate-from-right">Our</span>
            <span className="inline-block anima
            te-from-top">Beautiful</span>
            <span className="inline-block animate-from-left">Post Page</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Discover amazing content curated by the community</p>
          <hr className="mt-4 border-t-2 border-indigo-500 w-24 mx-auto animate-pulse" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 mb-8 mx-auto block px-4 py-2 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg text-2xl transition-transform hover:scale-110"
        onClick={() => alert("FAB Clicked! Add Post logic here")}
      >
        +
      </button>
    </div>
  );
};

export default Homepage;
