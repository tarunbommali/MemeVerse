// store/appStore.ts

import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./localesSlice";

const appStore = configureStore({
  reducer: {
    locale: localeReducer,
  },
});

export default appStore;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
