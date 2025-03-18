import React, { useState } from "react";
import { createPost, updatePost } from "../services/api";

// רכיב להעלאת פוסט חדש או עדכון פוסט קיים

interface PostFormProps {
  post?: { _id: string; title: string; content: string; imageUrl?: string };
  onSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSuccess }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      if (post) {
        await updatePost(post._id, formData);
      } else {
        await createPost(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;