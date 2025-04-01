import { Message } from "./messageModel";
import { User } from "./userModel";

export class Chat {
  _id?: string;
  participants?: User[];
  deletedBy?: { userId: string; deletedAt?: Date }[];
  messages?: Message[];
  createdAt?: Date;
  updatedAt?: string;
}