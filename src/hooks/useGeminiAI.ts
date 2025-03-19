import axios from "axios";
import { useState } from "react";
import { appConfig } from "../utils/AppConfig";

export const useGeminiAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${appConfig.BASE_API_URL}/chat`, {
        prompt: input,
      });

      setMessages((prev) => [...prev, { role: "ai", text: res.data.response }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Oops! Something went wrong. Try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, messages, handleAskAI, input, setInput };
};
