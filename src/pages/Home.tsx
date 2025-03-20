import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import { createPost } from "../services/api";
import PostList from "../components/PostList";

const Home: React.FC = () => {
  useTitle("Home Page");

  // 🔹 State for title and content input
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ✅ Function to handle post creation
  const handleCreatePost = async () => {
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    console.log("Submitting new post:", { title, content });

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      await createPost(formData);
      console.log("Post created successfully");

      // Clear input fields after successful post
      setTitle("");
      setContent("");

      // ❌ No need to manually fetch posts, as `useFetchPosts` in `PostList` handles it
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
        Welcome to MovieClub 🎬
      </h1>

      {/* New Post Section */}
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

        {/* Buttons */}
        <div className="buttons flex">
          <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </button>
          <button
            onClick={handleCreatePost} // ✅ Connected function here
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            Post
          </button>
        </div>
      </div>

      {/* List of Posts - No props needed */}
      <div className="mt-12">
        <PostList />
      </div>
    </div>
  );
};

export default Home;
