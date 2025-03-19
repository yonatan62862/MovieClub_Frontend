import { useFetchPosts } from "../hooks/useFetchPosts";
import PostCard from "./PostCard";

function PostList() {
  const { posts } = useFetchPosts();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {posts.map((post) => (
        <PostCard
          post={post}
          key={post._id}
        />
      ))}
    </div>
  );
}

export default PostList;
