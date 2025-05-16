import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Meme {
  postLink: string | undefined;
  id: string | number;
  url: string;
  title: string;
}

interface MemesState {
  memes: Meme[];
  loading: boolean;
}

const initialState: MemesState = {
  memes: [],
  loading: false,
};

const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setMemes: (state, action: PayloadAction<Meme[]>) => {
      state.memes = action.payload;
    },
    addMemes: (state, action: PayloadAction<Meme[]>) => {
      state.memes = [...state.memes, ...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
export const { setMemes, addMemes, setLoading } = memesSlice.actions;
export default memesSlice.reducer;
