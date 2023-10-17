import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  sidebarToggle: boolean;
}

const initialState: SidebarState = {
  sidebarToggle: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarToggle = !state.sidebarToggle;
    },
    closeSidebar: (state) => {
      state.sidebarToggle = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;