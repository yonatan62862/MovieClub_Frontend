import axios from "axios";
import store from "../redux/store";
import { login } from "../redux/authSlice";
import { LoginResponse } from "../models/Common";
import { appConfig } from "../utils/AppConfig";

const api = axios.create({
  baseURL: appConfig.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axios.post<LoginResponse>(
    `${appConfig.BASE_API_URL}/auth/login`,
    userData
  );
  const { user, accessToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  store.dispatch(login(user));
};

export const registerUser = async (userData: {
  email: string;
  password: string;
}) => {
  return axios.post(`${appConfig.BASE_API_URL}/auth/register`, userData);
};

export const getPosts = async (page = 1, limit = 10) => {
  const response = await api.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const createPost = async (postData: FormData) => {
  const response = await api.post("/posts", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updatePost = async (id: string, postData: FormData) => {
  const response = await api.put(`/posts/${id}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const getUserPosts = async (userId: string) => {
  const response = await api.get(`/posts?owner=${userId}`);
  return response.data;
};

export const getComments = async (postId: string) => {
  const response = await api.get(`/comments?postId=${postId}`);
  return response.data;
};

export const createComment = async (commentData: {
  postId: string;
  content: string;
}) => {
  const response = await api.post("/comments", commentData);
  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};
