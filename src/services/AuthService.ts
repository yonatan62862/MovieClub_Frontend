import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export interface AuthData {
  username: string;
  email?: string;
  password: string;
}

export const register = async (data: AuthData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const login = async (data: AuthData) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
