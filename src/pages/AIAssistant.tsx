import React, { useState } from "react";
import axios from "axios";
import { useTitle } from "../hooks/useTitle";

const AIAssistant: React.FC = () => {
  useTitle("AI Assistant");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleAskAI = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai", {
        message: input,
      });
      setResponse(res.data.reply);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">AI Assistant 🤖</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something about movies..."
        className="w-full max-w-lg p-3 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleAskAI}
        className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Ask AI
      </button>
      {response && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md max-w-lg">
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
