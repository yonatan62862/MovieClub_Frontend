import { useEffect, useRef, useState } from "react";
import { Chat } from "../models/chatModel";
import { Message } from "../models/messageModel";
import { User } from "../models/userModel";
import { socketService } from "../services/socket-service";

interface Props {
  chat: Chat;
  currentUser: User;
}

export function ChatWindow({ chat, currentUser }: Props) {
  const [messages, setMessages] = useState<Message[]>(chat.messages || []);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const handleMessage = (msg: Message) => {
      if (msg.chatId === chat._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socketService.connect(handleMessage, () => {});
    socketService["socket"]?.emit("joinChat", chat._id);

    return () => {
      socketService.disconnect();
    };
  }, [chat._id]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const receiverId = chat.participants?.find(
      (u) => u._id !== currentUser._id
    )?._id;

    socketService.sendMessage({
      content: newMessage,
      senderId: currentUser._id,
      receiverId,
      chatId: chat._id,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col flex-grow overflow-y-auto space-y-3 px-2 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-sm break-words ${
              msg.senderId === currentUser._id
                ? "bg-blue-600 text-white self-end rounded-br-none"
                : "bg-gray-100 text-gray-800 self-start rounded-bl-none"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
  
      <div className="flex items-center gap-2 border-t pt-4 mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}  