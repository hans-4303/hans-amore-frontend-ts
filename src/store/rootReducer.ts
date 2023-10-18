import { combineReducers } from "@reduxjs/toolkit";

import sidebarReducer from "@slices/sidebar.slice";
import themeReducer from "@slices/theme.slice";
import authTempReducer from "@slices/auth.temp.slice";
import counterReducer from "@slices/counter.slice";

export const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  theme: themeReducer,
  authTemp: authTempReducer,
  counter: counterReducer,
});
