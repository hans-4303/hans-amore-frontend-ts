import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "../slices/sidebar.slice";
import themeReducer from "../slices/sidebar.slice";

export const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  themeReducer: themeReducer,
});
