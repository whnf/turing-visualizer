import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Theme } from "@/lib/storage";

type ThemeState = {
  theme: Theme;
};

const initialState: ThemeState = {
  theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setSystemTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
  },
});

export const { toggleTheme, setSystemTheme } = themeSlice.actions;

export const { selectTheme } = themeSlice.selectors;

export default themeSlice.reducer;
