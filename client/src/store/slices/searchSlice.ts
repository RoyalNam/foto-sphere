import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSearchPhotos,
  fetchSearchCollections,
  fetchSearchUsers,
} from "../actions";
import { handleAsyncReducers } from "@/utils";
import { createAsyncState, SearchState } from "@/types/stateTypes";

const initialState: SearchState = {
  photos: createAsyncState([], true),
  collections: createAsyncState([], true),
  users: createAsyncState([], true),
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchPhotos: (state) => {
      state.photos = createAsyncState([], true);
    },
    resetSearchCollections: (state) => {
      state.collections = createAsyncState([], true);
    },
    resetSearchUsers: (state) => {
      state.users = createAsyncState([], true);
    },
    resetAllSearch: (state) => {
      state.photos = createAsyncState([], true);
      state.collections = createAsyncState([], true);
      state.users = createAsyncState([], true);
    },
  },
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchSearchPhotos, "photos");
    handleAsyncReducers(builder, fetchSearchCollections, "collections");
    handleAsyncReducers(builder, fetchSearchUsers, "users");
  },
});

export const {
  resetSearchPhotos,
  resetSearchCollections,
  resetSearchUsers,
  resetAllSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
