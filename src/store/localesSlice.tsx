// store/slices/localesSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LocaleState {
  language: string;
}

const initialState: LocaleState = {
  language: "en", // default language
};

initialState.language = localStorage.getItem("language") || "en"; 

const localesSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload); 
    },
  },
});

export const { setLanguage } = localesSlice.actions;
export default localesSlice.reducer;
