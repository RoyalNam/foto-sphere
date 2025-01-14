import { createSelector } from "@reduxjs/toolkit";
import { PhotoState, RootState } from "@/types/stateTypes";

export const selectPhotoState = (state: RootState): PhotoState => state.photo;

export const selectEditorialFeed = createSelector(
  selectPhotoState,
  (state: PhotoState) => state.editorialFeed
);

export const selectPhotoDetails = createSelector(
  selectPhotoState,
  (state: PhotoState) => state.photoDetails
);

export const selectRandomPhoto = createSelector(
  selectPhotoState,
  (state: PhotoState) => state.randomPhoto
);

export const selectLikedPhotos = createSelector(
  selectPhotoState,
  (state: PhotoState) => state.likedPhotos
);
