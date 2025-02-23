import { configureStore } from "@reduxjs/toolkit";
import {
  photoReducer,
  collectionReducer,
  topicReducer,
  searchReducer,
} from "./slices";

const store = configureStore({
  reducer: {
    photo: photoReducer,
    collection: collectionReducer,
    topic: topicReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
