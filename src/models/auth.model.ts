import { User } from "@models/user.model";

export interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export type LoginUser = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterUser = {
  email: string;
  name: string;
  password: string;
};

