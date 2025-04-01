import axios from "axios";
import { Chat } from "../models/chatModel";
import apiClient from "./api-client";

class ChatsService {
  public async getChats(userId: string): Promise<Chat[]> {
    const response = await apiClient.get<Chat[]>(`/api/chats/${userId}`);
    return response.data;
  }

  public async startChat(participants: string[]): Promise<void> {
    await apiClient.post<Chat>(`/api/chats`, {
      participants: participants,
    });
  }
}

export const chatsService = new ChatsService();