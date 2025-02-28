import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEditorialFeed,
  fetchPhotoById,
  fetchRandomPhoto,
  fetchSearchPhotos,
} from "../actions";
import { handleAsyncReducers } from "@/utils";
import { createAsyncState, PhotoState } from "@/types/stateTypes";

const initialState: PhotoState = {
  editorialFeed: createAsyncState([], true),
  photoDetails: createAsyncState(null),
  randomPhoto: createAsyncState(null),
  relatedPhotos: createAsyncState([], true),
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
    resetRelatedPhotos: (state) => {
      state.relatedPhotos = createAsyncState([], true);
    },
    resetAllPhoto: (state) => {
      state.editorialFeed = createAsyncState([], true);
      state.photoDetails = createAsyncState(null);
      state.randomPhoto = createAsyncState(null);
      state.relatedPhotos = createAsyncState([], true);
    },
  },
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchEditorialFeed, "editorialFeed");
    handleAsyncReducers(builder, fetchPhotoById, "photoDetails");
    handleAsyncReducers(builder, fetchRandomPhoto, "randomPhoto");
    handleAsyncReducers(builder, fetchSearchPhotos, "relatedPhotos");
  },
});

export const {
  resetEditorialFeed,
  resetPhotoDetails,
  resetRandomPhoto,
  resetRelatedPhotos,
  resetAllPhoto,
} = photoSlice.actions;

export default photoSlice.reducer;
