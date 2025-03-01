import { createSelector } from "@reduxjs/toolkit";
import { UserState, RootState } from "@/types/stateTypes";

export const selectUserState = (state: RootState): UserState => state.user;

export const selectUserInfo = createSelector(
  selectUserState,
  (state: UserState) => state.userInfo
);

export const selectUserPhotos = createSelector(
  selectUserState,
  (state: UserState) => state.userPhotos
);

export const selectUserCollections = createSelector(
  selectUserState,
  (state: UserState) => state.userCollections
);

export const selectUserLikes = createSelector(
  selectUserState,
  (state: UserState) => state.userLikes
);
