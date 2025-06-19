import { useNavigate } from 'react-router-dom';
import { CalendarDays, UserCircle } from 'lucide-react';

const Card = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/singlepost/${post?._id}`)}
      className="max-w-full w-full sm:w-[400px] cursor-pointer group bg-gradient-to-tr from-white via-gray-50 to-gray-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                 rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02]
                 transition-transform duration-300 p-6 border border-gray-200 dark:border-gray-700"
    >
      {/* Topic - 2 lines max */}
      <p className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100
                   text-xs font-semibold px-3 py-1 rounded mb-4 uppercase tracking-wide
                   line-clamp-2 overflow-hidden text-ellipsis">
        {post?.topic ||
          "Example topic that might be a little too long and should wrap into two lines with ellipsis..."}
      </p>

      {/* Question - 3 lines max */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:underline
                     line-clamp-3 overflow-hidden text-ellipsis">
        {post?.question ||
          "This is a placeholder question that is long enough to test three lines of clamping with ellipsis and responsive wrapping behavior in Tailwind CSS."}
      </h2>

      {/* Answer - 6 lines max */}
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4
                    line-clamp-6 overflow-hidden text-ellipsis">
        {post?.answer ||
          "This is a placeholder answer that is intentionally long so we can test the behavior of line clamping within a Tailwind-styled component. This should ideally show up to six lines of content, and then truncate with an ellipsis to indicate there’s more to read. This helps maintain a clean UI, especially when dealing with variable user input or long posts. It also encourages users to click into the post for the full content."}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t pt-4 mt-4">
        <div className="flex items-center gap-2">
          <UserCircle size={16} />
          <span>{post?.author || "Anonymous"}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
