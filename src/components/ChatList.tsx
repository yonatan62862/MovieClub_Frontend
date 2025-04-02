import { Chat } from "../models/chatModel";
import { User } from "../models/userModel";

interface Props {
  chats: Chat[];
  currentUserId: string;
  onSelectChat: (chat: Chat) => void;
}

export function ChatList({ chats, currentUserId, onSelectChat }: Props) {
  return (
    <div className="w-full max-w-sm h-full border-r bg-white overflow-y-auto shadow-inner">
      <h2 className="text-xl font-bold px-4 py-3 border-b text-gray-800">Chats</h2>
      <div className="divide-y">
        {chats?.map((chat) => {
          const otherUser = chat.participants?.find(
            (user) => user._id !== currentUserId
          );

          const lastMessage = chat.messages?.[chat.messages.length - 1];

          return (
            <div
              key={chat._id}
              className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
              onClick={() => onSelectChat(chat)}
            >
              <img
                src={
                  otherUser?.profileImage
                    ? `${import.meta.env.VITE_BACKEND_URL}${otherUser.profileImage}`
                    : "/default-avatar.png"
                }
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover mr-4 border"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {otherUser?.username || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {lastMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
