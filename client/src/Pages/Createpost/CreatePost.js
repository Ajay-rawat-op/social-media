// Install dependencies first:
// npm install @heroicons/react framer-motion

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { LightBulbIcon, ClipboardDocumentIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const CreatePost = () => {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const { postID } = useParams();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (postID) {
      axios.get(`${BACKEND_URL}/getSinglePost?postID=${postID}`)
        .then(res => {
          const post = res.data.responseData;
          setTopic(post?.topic || '');
          setQuestion(post?.question || '');
          setAnswer(post?.answer || '');
        })
        .catch(console.error);
    }
  }, [postID, BACKEND_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { topic, question, answer, postID };
    const req = postID ? axios.put(`${BACKEND_URL}/updatePost`, payload)
                        : axios.post(`${BACKEND_URL}/createPost`, payload);
    try {
      const res = await req;
      if (res.data?.responseData) navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-lg bg-white rounded-2xl shadow-md p-10"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          {postID ? '✏️ Update Your Post' : '📝 Create a New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* topic */}
          <div className="relative">
            <LightBulbIcon className="h-6 w-6 text-indigo-400 absolute left-3 top-4" />
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              required
              placeholder="Topic"
              className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 focus:border-indigo-400 focus:outline-none transition"
            />
          </div>

          {/* question */}
          <div className="relative">
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-indigo-400 absolute left-3 top-4" />
            <textarea
              id="question"
              rows="4"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              required
              placeholder="Your question..."
              className="w-full pl-12 pr-4 pt-3 pb-2 border-b-2 border-gray-200 focus:border-indigo-400 focus:outline-none transition resize-none"
            />
          </div>

          {/* answer */}
          <div className="relative">
            <ClipboardDocumentIcon className="h-6 w-6 text-indigo-400 absolute left-3 top-4" />
            <textarea
              id="answer"
              rows="6"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              required
              placeholder="Your answer..."
              className="w-full pl-12 pr-4 pt-3 pb-2 border-b-2 border-gray-200 focus:border-indigo-400 focus:outline-none transition resize-none"
            />
          </div>

          {/* submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl bg-indigo-500 text-white font-medium shadow-md hover:bg-indigo-600 transition"
          >
            {postID ? 'Update Post' : 'Submit Post'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
