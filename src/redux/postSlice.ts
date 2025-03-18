import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PostState {
  posts: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/posts?page=${page}&limit=5`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData: FormData, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/posts", formData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts, ...action.payload];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {} = postSlice.actions;
export const postsReducer = postSlice.reducer;
