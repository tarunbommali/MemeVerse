// store/appStore.ts

import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./localesSlice";
import memesReducer from "./memesSlice";
const appStore = configureStore({
  reducer: {
    locale: localeReducer,
    memes: memesReducer,

  },
});

export default appStore;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
