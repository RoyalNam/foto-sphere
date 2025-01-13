import { configureStore } from "@reduxjs/toolkit";
import { photoReducer } from "./slices";

const store = configureStore({
  reducer: {
    photo: photoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
