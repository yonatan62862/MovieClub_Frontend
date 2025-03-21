// hooks/useFetchPosts.ts
import { useEffect, useState, useCallback } from "react";
import { User } from "../models/User";
import axios from "axios";
import { appConfig } from "../utils/AppConfig";

export interface Post {
  _id: string;
  owner: Partial<User>;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt?: string;
  likesCount: number;
}

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(appConfig.POSTS_URL);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, refreshPosts: fetchPosts };
};
