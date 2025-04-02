import { useEffect, useState } from "react";
import { ChatList } from "../components/ChatList";
import { ChatWindow } from "../components/ChatWindow";
import { Chat } from "../models/chatModel";
import { chatsService } from "../services/chat-service";
import apiClient from "../services/api-client";
import { User } from "../models/userModel";
import { useSearch } from "../hooks/useSearch";

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    query,
    users,
    loading,
    error,
    handleSearch,
  } = useSearch();

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
    if (!user || !selectedUser) {
      alert("Please select a user to start chat with.");
      return;
    }

    try {
      const { data: newChat } = await apiClient.post<Chat>("/api/chats", {
        participants: [user._id, selectedUser._id],
      });

      setChats((prevChats) => [newChat, ...prevChats]);
      setSelectedChat(newChat);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error starting chat:", err);
      alert("Failed to start chat.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-white border-b shadow-sm flex items-center gap-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search user by username..."
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {loading && <p className="text-sm text-gray-500 mt-1">Loading...</p>}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          {users.length > 0 && (
            <ul className="absolute bg-white border w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-auto z-20">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => setSelectedUser(user)}
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${user.profileImage}`}
                    alt={user.username}
                    className="w-5 h-5 rounded-full object-cover border"
                  />
                  <span className="text-gray-800 font-medium">{user.username}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleStartChat}
          disabled={!selectedUser}
          className={`px-5 py-2 rounded-lg font-medium transition ${selectedUser
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Start Chat
        </button>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <aside className="w-full max-w-sm bg-white border-r overflow-y-auto shadow-inner">
          <ChatList
            chats={chats}
            currentUserId={user?._id!}
            onSelectChat={setSelectedChat}
          />
        </aside>

        <main className="flex-grow bg-gray-100 overflow-hidden relative">
          {selectedChat && user ? (
            <ChatWindow chat={selectedChat} currentUser={user} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
              Select a chat to start messaging
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default ChatPage;
