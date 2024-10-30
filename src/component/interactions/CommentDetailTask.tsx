import { ArrowUp, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import Helper from "../../constant/Helper";
import useComments from "../../hook/Api/comments/useComments"; // Import your hook
import { notifyError, notifySuccess } from "../toastify/Toastify";

const CommentDetailTask = ({ onConmments, id }: any) => {
  const { onComment } = useComments();
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const taskId = id || "";
    const commentParams = {
      content: newComment,
      taskId,
    };

    try {
      await onComment(commentParams);
      setNewComment("");
      notifySuccess("Comment posted successfully");
    } catch (error) {
      console.error("Failed to post comment:", error);
      notifyError("Failed to post comment");
    }
  };

  return (
    <div className="border-t border-gray-700 overflow-y-auto scrollbar-hide">
      <div className="p-2 bg-[#0f0a2a]">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        <div className="space-y-4">
          {onConmments?.map((comment: any, index: any) => (
            <div key={index} className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                <span className="text-xs">C</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">
                    {comment?.user?.username}
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white">
                      <Edit size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  {Helper.formatEngDate(comment?.createdAt)}
                </p>
              </div>
            </div>
          ))}
          <div className="relative flex items-center">
            <div className="relative flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 shrink-0 overflow-hidden">
                <span className="text-sm">C</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-grow bg-[#1a1438] rounded p-2 text-sm pr-10"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="absolute right-2 text-gray-400 hover:text-white rounded-full bg-gray-700"
              onClick={handleCommentSubmit}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDetailTask;
