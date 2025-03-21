import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/User";

export interface UserState {
  user: User | null;
  isAutenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAutenticated:
    sessionStorage.getItem("token") !== null ||
    localStorage.getItem("accessToken") !== null,
  isLoading: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAutenticated = true;
      state.isLoading = false;
    },
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAutenticated = true;
      state.isLoading = false;
    },
    updateUser(state, action: PayloadAction<User>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout(state) {
      state.user = null;
      state.isAutenticated = false;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { register, login, logout, updateUser, setLoading } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
