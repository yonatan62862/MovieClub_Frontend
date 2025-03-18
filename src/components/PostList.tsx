import React, { useState, useEffect } from "react";
import { getPosts, deletePost } from "../services/api";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

// רכיב להצגת רשימת פוסטים 
const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [editingPost, setEditingPost] = useState<null | any>(null);

  const fetchPosts = async () => {
    const data = await getPosts(page);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleDelete = async (id: string) => {
    await deletePost(id);
    fetchPosts();
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
  };

  const handleFormSuccess = () => {
    setEditingPost(null);
    fetchPosts();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Posts</h1>
      <PostForm post={editingPost} onSuccess={handleFormSuccess} />
      {posts.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          onDelete={() => handleDelete(post._id)}
          onEdit={() => handleEdit(post)}
        />
      ))}
      <div className="flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;