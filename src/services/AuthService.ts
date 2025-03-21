import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/User";
import store from "../redux/store";
import { login, logout, register } from "../redux/authSlice";
import { appConfig } from "../utils/AppConfig";
import { LoginResponse } from "../models/Common";

class AuthService {
  public constructor() {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<{
          exp: number;
          iat: number;
          random: string;
          _id: string;
        }>(token);
        const { _id } = decodedToken;
        this.fetchUserData(_id);
      } catch (error) {
        store.dispatch(logout());
        sessionStorage.removeItem("token");
      }
    }
  }

  private async fetchUserData(userId: string): Promise<void> {
    try {
      const response = await axios.get(
        `${appConfig.BASE_API_URL}/users/${userId}`
      );
      const user = response.data;
      console.log(user);
      store.dispatch(login(user));
    } catch (error) {
      console.error("Failed to fetch user data", error);
      store.dispatch(logout());
      sessionStorage.removeItem("token");
    }
  }

  public async register(credentials: User): Promise<void> {
    const response = await axios.post<{ user: User; token: string }>(
      `${appConfig.BASE_API_URL}/auth/register`,
      credentials
    );
    const { token, user } = response.data;
    store.dispatch(register(user));
    sessionStorage.setItem("token", token);
  }

  public async login(credentials: {
    email: string;
    password: string;
  }): Promise<void> {
    const response = await axios.post<LoginResponse>(
      `${appConfig.BASE_API_URL}/auth/login`,
      credentials
    );

    console.log(response.data);
    const { accessToken, user } = response.data;
    localStorage.setItem("userId", response.data._id);
    store.dispatch(login(user));
    sessionStorage.setItem("token", accessToken);
  }
  public logOut(): void {
    store.dispatch(logout());
    sessionStorage.removeItem("token");
  }
}
export const authService = new AuthService();
