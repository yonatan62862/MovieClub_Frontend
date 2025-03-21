// pages/Home.tsx
import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import { createPost } from "../services/api";
import PostList from "../components/PostList";
import { useFetchPosts } from "../hooks/useFetchPosts";

const Home: React.FC = () => {
  useTitle("Home Page");

  const { posts, refreshPosts } = useFetchPosts();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    try {
      const formData = new FormData();
      const userId = localStorage.getItem("userId");
      formData.append("title", title);
      formData.append("owner", userId || "");
      formData.append("content", content);

      await createPost(formData);

      // Clear inputs
      setTitle("");
      setContent("");

      // Refresh post list
      refreshPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
        Welcome to MovieClub 🎬
      </h1>

      <div className="heading text-center font-bold text-2xl mb-6 text-gray-800">
        Share Your Movie Experience
      </div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white mb-12">
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Movie Name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Would you recommend this movie? Share your take!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="buttons flex">
          <button
            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            onClick={() => {
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePost}
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="mt-12">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Home;
