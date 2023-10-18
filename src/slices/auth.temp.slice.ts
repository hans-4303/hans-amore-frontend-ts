import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@mocks/auth.mock";
import { User } from "@models/user.model";

import { AuthState } from "@models/auth.model";

export const initializeUser = createAsyncThunk<User | null, void>(
  "auth/initializeUser",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        const user = await authApi.me(accessToken);
        return user;
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

type LoginUser = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const loginUser = createAsyncThunk<User, LoginUser>(
  "auth/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const accessToken = await authApi.login({ email, password, rememberMe });
      const user = await authApi.me(accessToken);
      localStorage.setItem("accessToken", accessToken);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async () => {
    localStorage.removeItem("accessToken");
  }
);

type RegisterUser = {
  email: string;
  name: string;
  password: string;
};

export const registerUser = createAsyncThunk<User, RegisterUser>(
  "auth/registerUser",
  async ({ email, name, password }) => {
    try {
      const accessToken = await authApi.register({ email, name, password });
      const user = await authApi.me(accessToken);
      localStorage.setItem("accessToken", accessToken);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const authTempSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.pending, (state) => {
        state.isInitialized = true;
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload ? true : false;
        state.user = action.payload;
      })
      .addCase(initializeUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      });
  },
});

export default authTempSlice.reducer;
