import React from "react";
import { useTitle } from "../hooks/useTitle";
import PostList from "../components/PostList";

const Home: React.FC = () => {
  useTitle("Home Page");

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">
        Welcome to MovieClub 🎬
      </h1>
      <PostList />
    </div>
  );
};

export default Home;
