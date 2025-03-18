import React, { useEffect, useState } from "react";
import axios from "axios";
import { appConfig } from "../utils/AppConfig";
import { useTitle } from "../hooks/useTitle";

interface Post {
  _id: string;
  userId: { username: string };
  text: string;
  imageUrl?: string;
  createdAt: string;
}

const Home: React.FC = () => {
  useTitle("Home Page");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(appConfig.POSTS_URL);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Welcome to MovieClub 🎬
      </h1>

      <div className="max-w-2xl mx-auto">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <h2 className="font-semibold">{post.userId.username}</h2>
            <p className="text-gray-700">{post.text}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="mt-2 w-full rounded-md"
              />
            )}
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
