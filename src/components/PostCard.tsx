import { useSelector } from "react-redux";
import { Post } from "../hooks/useFetchPosts";
import { AppState } from "../redux/state";
import PostActions from "./PostActions";
import { likesService } from "../services/LikesService";

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  const { user } = useSelector((appState: AppState) => appState.auth);
  const isOwnPost = user?._id === post.owner?._id;
  const handleLike = async () => {
    try {
      await likesService.toggleLike("Post", post?._id, user?._id as string);
    } catch (error) {}
  };

  return (
    <div
      key={post._id}
      className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 transition-all hover:shadow-2xl relative"
    >
      {isOwnPost && <PostActions postId={post?._id} />}

      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div>
          <p className="text-xl font-semibold text-gray-800">
            {post.owner?.firstName} {post.owner?.lastName}
          </p>
          <p className="text-sm text-gray-500">
            {post.createdAt && new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
      <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="mt-4 w-full h-auto rounded-xl shadow-md object-cover"
        />
      )}

      <div className="flex items-center space-x-6 mt-4">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 20h9M12 4H3m9 16l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="font-semibold">Like</span>
          <span className="ml-1 text-sm text-gray-700">{post?.likesCount}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 9h6M9 12h6m-6 3h6"
            />
          </svg>
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
