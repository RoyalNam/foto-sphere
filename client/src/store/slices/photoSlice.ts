import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchEditorialFeed,
  fetchPhotoById,
  fetchRandomPhoto,
  likePhotoAction,
  unLikePhotoAction,
} from "../actions";
import { handleAsyncActions } from "@/utils";
import { createAsyncState, PhotoState } from "@/types/stateTypes";
import { Photo } from "@/types";

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
    builder
      .addCase(fetchEditorialFeed.pending, (state) => {
        state.editorialFeed.isLoading = true;
        state.editorialFeed.error = null;
      })
      .addCase(
        fetchEditorialFeed.fulfilled,
        (state, action: PayloadAction<{ data: Photo[]; hasMore: boolean }>) => {
          state.editorialFeed.isLoading = false;
          state.editorialFeed.data = state.editorialFeed.data.concat(
            action.payload.data
          );
          state.editorialFeed.error = null;
          state.editorialFeed.hasMore = action.payload.hasMore;
        }
      )
      .addCase(fetchEditorialFeed.rejected, (state, action) => {
        state.editorialFeed.isLoading = false;
        state.editorialFeed.error = action.payload || "An error occurred";
      });
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
