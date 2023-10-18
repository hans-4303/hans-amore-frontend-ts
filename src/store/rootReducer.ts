import { combineReducers } from "@reduxjs/toolkit";

import sidebarReducer from "@slices/sidebar.slice";
import themeReducer from "@slices/theme.slice";
import authReducer from "@slices/auth.slice";

export const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  theme: themeReducer,
  auth: authReducer,
});
