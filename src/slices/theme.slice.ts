import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  themeName: string;
}

const initialState: ThemeState = {
  themeName: 'PureLightTheme',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeName: (state, action) => {
      state.themeName = action.payload;
    },
  },
});

export const { setThemeName } = themeSlice.actions;
export default themeSlice.reducer;