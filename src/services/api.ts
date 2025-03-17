import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (userData: { email: string; password: string }) => {
  return axios.post(`${API_URL}/login`, userData); 
};

export const registerUser = async (userData: { email: string; password: string }) => {
  return axios.post(`${API_URL}/register`, userData);
};