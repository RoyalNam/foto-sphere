import { configureStore } from "@reduxjs/toolkit";
import { photoReducer, collectionReducer } from "./slices";

const store = configureStore({
  reducer: {
    photo: photoReducer,
    collection: collectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
