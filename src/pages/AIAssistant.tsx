import React from "react";
import { useGeminiAI } from "../hooks/useGeminiAI";
import { useTitle } from "../hooks/useTitle";

const AIAssistant: React.FC = () => {
  useTitle("AI Assistant");
  const { handleAskAI, messages, isLoading, input, setInput } = useGeminiAI();
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🤖 AI Assistant</h1>
      <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col space-y-4 overflow-y-auto h-[500px]">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">
            💬 Ask something to start chatting...
          </p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white max-w-[75%] self-end"
                  : "bg-gray-700 text-white max-w-[75%]"
              }`}
            >
              {msg.role === "user" ? "🧑‍💻 " : "🤖 "}
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.text.replace(/\n/g, "<br>"),
                }}
              />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-400 text-center">⏳ AI is thinking...</div>
        )}
      </div>

      <div className="w-full max-w-2xl mt-4 flex items-center bg-gray-700 p-2 rounded-lg">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-white outline-none p-2 resize-none"
          rows={2}
        />
        <button
          onClick={handleAskAI}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-2 disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          🚀 Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
