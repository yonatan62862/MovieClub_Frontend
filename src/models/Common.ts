import { User } from "./User";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  _id: string;
  user: User;
}
