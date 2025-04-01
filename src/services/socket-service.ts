import { Socket, io } from "socket.io-client";
import { Chat } from "../models/chatModel";
import { Message } from "../models/messageModel";
const backend_url = import.meta.env.VITE_BACKEND_URL

class SocketService {
  private socket!: Socket;
  public connect(
    handleMessage: (msg: Message) => void,
    handleStartChat: (chat: Chat) => void,
  ): void {
    this.socket = io(backend_url, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      console.log("Connected to web socket");
    });

    this.socket.on("startChat", (chat: Chat) => {
      handleStartChat(chat);
    });
    this.socket.on("sendMessage", (msg: Message) => {
      handleMessage(msg);
    });
    this.socket.on("error", (error) => {
      console.error("Socket connection error:", error);
    });
    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
  }

  public sendMessage(messageData: Partial<Message>): void {
    this.socket.emit("sendMessage", messageData);
  }

  public startChat(chat: Chat): void {
    this.socket.emit("startChat", chat);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();