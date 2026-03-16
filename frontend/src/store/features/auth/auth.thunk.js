import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/axiosinstance";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user: ", error);
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      toast.success("User logged in successfully!");
      return response.data;
    } catch (error) {
      console.error("Error logging in user: ", error);
      toast.error(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Error logging out user: ", error);
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const response = await api.get("/auth/get-me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info: ", error);
  }
});
