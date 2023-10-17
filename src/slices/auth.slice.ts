import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../mocks/auth.mock';
import { User } from '../models/user.model';

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
  name: 'auth',
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
      state.isAuthenticated = false;
      state.user = null;
    },
    register: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { initialize, login, logout, register } = authSlice.actions;
export default authSlice.reducer;