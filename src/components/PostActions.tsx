type PostActionsProps = {
  postId: string;
};

function PostActions({ postId }: PostActionsProps) {
  const handleEdit = async (postId: string) => {
    try {
      console.log("Edit post", postId);
    } catch (error) {}
  };

  const handleDelete = async (postId: string) => {
    try {
      console.log("Deleting post", postId);
    } catch (error) {}
  };
  return (
    <div className="absolute top-4 right-4 space-x-4">
      <button
        onClick={() => handleEdit(postId)}
        className="text-yellow-500 hover:text-yellow-700"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(postId)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default PostActions;
