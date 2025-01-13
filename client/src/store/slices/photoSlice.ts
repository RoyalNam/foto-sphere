import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEditorialFeed,
  fetchPhotoById,
  fetchRandomPhoto,
  likePhotoAction,
  unLikePhotoAction,
} from "../actions";
import { createAsyncState, PhotoState } from "@/types";
import { handleAsyncActions } from "@/utils";

const initialState: PhotoState = {
  editorialFeed: createAsyncState([]),
  photoDetails: createAsyncState(null),
  randomPhoto: createAsyncState(null),
  likedPhotos: createAsyncState([]),
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetEditorialFeed: (state) => {
      state.editorialFeed = createAsyncState([]);
    },
    resetPhotoDetails: (state) => {
      state.photoDetails = createAsyncState(null);
    },
    resetRandomPhoto: (state) => {
      state.randomPhoto = createAsyncState(null);
    },
    resetLikedPhotos: (state) => {
      state.likedPhotos = createAsyncState([]);
    },
    resetAllPhoto: (state) => {
      state.editorialFeed = createAsyncState([]);
      state.photoDetails = createAsyncState(null);
      state.randomPhoto = createAsyncState(null);
      state.likedPhotos = createAsyncState([]);
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, fetchEditorialFeed, "editorialFeed");
    handleAsyncActions(builder, fetchPhotoById, "photoDetails");
    handleAsyncActions(builder, fetchRandomPhoto, "randomPhoto");
    handleAsyncActions(builder, likePhotoAction, "likedPhotos");
    handleAsyncActions(builder, unLikePhotoAction, "likedPhotos");
  },
});

export const {
  resetEditorialFeed,
  resetPhotoDetails,
  resetRandomPhoto,
  resetLikedPhotos,
  resetAllPhoto,
} = photoSlice.actions;

export default photoSlice.reducer;
