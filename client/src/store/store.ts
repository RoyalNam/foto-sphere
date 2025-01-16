import { configureStore } from "@reduxjs/toolkit";
import { photoReducer, collectionReducer, topicReducer } from "./slices";

const store = configureStore({
  reducer: {
    photo: photoReducer,
    collection: collectionReducer,
    topic: topicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
