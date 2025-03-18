import React from "react";
import { deletePost } from "../services/api"; // ייבוא הפונקציה

interface PostItemProps {
  post: { _id: string; title: string; content: string; imageUrl?: string };
  onDelete: () => void;
  onEdit: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      await deletePost(post._id); // קריאה לפונקציה
      onDelete(); // עדכון הרשימה לאחר המחיקה
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="mt-2 rounded" />
      )}
      <div className="mt-4 space-x-2">
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete} // שימוש בפונקציה
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;