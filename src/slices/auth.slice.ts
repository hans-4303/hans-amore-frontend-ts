import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@mocks/auth.mock";
import { User } from "@models/user.model";

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
      throw error; // 에러를 다시 던질 수도 있습니다.
    }
  }
);

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.isAuthenticated = false;
      state.user = null;
    },
    register: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        }
        state.isInitialized = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      });
  },
});

export const { initialize, login, logout, register } = authSlice.actions;
export default authSlice.reducer;
