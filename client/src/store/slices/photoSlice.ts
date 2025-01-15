import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEditorialFeed,
  fetchPhotoById,
  fetchRandomPhoto,
} from "../actions";
import { handleAsyncReducers } from "@/utils";
import { createAsyncState, PhotoState } from "@/types/stateTypes";

const initialState: PhotoState = {
  editorialFeed: createAsyncState([], true),
  photoDetails: createAsyncState(null),
  randomPhoto: createAsyncState(null),
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetEditorialFeed: (state) => {
      state.editorialFeed = createAsyncState([], true);
    },
    resetPhotoDetails: (state) => {
      state.photoDetails = createAsyncState(null);
    },
    resetRandomPhoto: (state) => {
      state.randomPhoto = createAsyncState(null);
    },
    resetAllPhoto: (state) => {
      state.editorialFeed = createAsyncState([], true);
      state.photoDetails = createAsyncState(null);
      state.randomPhoto = createAsyncState(null);
    },
  },
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchEditorialFeed, "editorialFeed");
    handleAsyncReducers(builder, fetchPhotoById, "photoDetails");
    handleAsyncReducers(builder, fetchRandomPhoto, "randomPhoto");
  },
});

export const {
  resetEditorialFeed,
  resetPhotoDetails,
  resetRandomPhoto,
  resetAllPhoto,
} = photoSlice.actions;

export default photoSlice.reducer;
