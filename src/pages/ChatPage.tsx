import { useEffect, useState } from "react";
import { ChatList } from "../components/ChatList";
import { ChatWindow } from "../components/ChatWindow";
import { Chat } from "../models/chatModel";
import { chatsService } from "../services/chat-service";
import apiClient from "../services/api-client";
import { User } from "../models/userModel";

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newUserId, setNewUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await apiClient.get("/api/user/profile");
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      try {
        if (!user?._id) return;
        const response = await chatsService.getChats(user._id);
        if (!Array.isArray(response)) {
          console.error("Expected array but got:", response);
          return;
        }
        setChats(response);
      } catch (err) {
        console.error("Error loading chats:", err);
      }
    };

    loadChats();
  }, [user?._id]);

  const handleStartChat = async () => {
    if (!newUserId || newUserId === user?._id) {
      alert("Please enter a valid user ID (not yourself)");
      return;
    }

    try {
      const { data: newChat } = await apiClient.post<Chat>("/api/chats", {
        participants: [user?._id, newUserId],
      });

      setNewUserId("");

      setChats((prevChats) => [newChat, ...prevChats]);

      setSelectedChat(newChat);
    } catch (err) {
      console.error("Error starting chat:", err);
      alert("Failed to start chat.");
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 border-b bg-white shadow-sm flex gap-2">
        <input
          type="text"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
          placeholder="Enter user ID to chat"
          className="flex-grow border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleStartChat}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Start Chat
        </button>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <div className="w-full max-w-xs bg-white border-r overflow-y-auto">
          <ChatList
            chats={chats}
            currentUserId={user?._id!}
            onSelectChat={setSelectedChat}
          />
        </div>

        <div className="flex-grow bg-gray-100 overflow-hidden">
          {selectedChat && user ? (
            <ChatWindow chat={selectedChat} currentUser={user} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
