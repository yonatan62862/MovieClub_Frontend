// components/PostList.tsx
import PostCard from "./PostCard";
import { Post } from "../hooks/useFetchPosts";

interface Props {
  posts: Post[];
}

function PostList({ posts }: Props) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}

export default PostList;
