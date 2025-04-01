import { useEffect, useState } from "react";
import { Chat } from "../models/chatModel";
import { User } from "../models/userModel";

interface Props {
  chats: Chat[];
  currentUserId: string;
  onSelectChat: (chat: Chat) => void;
}

export function ChatList({ chats, currentUserId, onSelectChat }: Props) {
  return (
    <div className="w-full max-w-sm border-r p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      {chats?.map((chat) => {
        const otherUser = chat.participants?.find(
          (user) => user._id !== currentUserId
        );


        return (
          <div
            key={chat._id}
            className="flex items-center p-3 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <img
              src={otherUser?.profileImage || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="font-semibold">{otherUser?.username || "Unknown"}</p>
              <p className="text-sm text-gray-500 truncate max-w-[200px]">
                {chat.messages?.[chat.messages.length - 1]?.content || "No messages yet"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
