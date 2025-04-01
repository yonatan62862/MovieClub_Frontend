import { Chat } from "./chatModel";
import { User } from "./userModel";

export class Message {
    _id?: string;
    content?: string;
    sender?: User;
    senderId?: string;
    participants?: User[];
    receiver?: User;
    receiverId?: string;
    chat?: Chat;
    chatId?: string;
  }