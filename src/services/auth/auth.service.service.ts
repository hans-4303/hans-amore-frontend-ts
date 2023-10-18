import axios from "axios";

import { LoginUser, RegisterUser } from "@models/auth.model";

const API_URL = "https://localhost:8080/api/auth";

const login = ({ email, password, rememberMe }: LoginUser): Promise<void> => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
      rememberMe,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = ({ email, name, password }: RegisterUser) => {
  return axios.post(API_URL + "signup", {
    email,
    name,
    password,
  });
};

const authService = {
  login,
  logout,
  register,
};

export default authService;
