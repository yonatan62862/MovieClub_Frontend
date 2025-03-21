// hooks/usePosts.ts
import { useEffect, useState } from "react";
import axios from "axios";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts"); // adjust the endpoint as needed
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  // Refresh when flag changes
  useEffect(() => {
    fetchPosts();
  }, [refreshFlag]);

  // Expose refresh trigger
  const refreshPosts = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  return { posts, refreshPosts };
}
