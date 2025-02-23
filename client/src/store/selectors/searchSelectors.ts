import { createSelector } from "@reduxjs/toolkit";
import { SearchState, RootState } from "@/types/stateTypes";

export const selectSearchState = (state: RootState): SearchState =>
  state.search;

export const selectSearchPhotos = createSelector(
  selectSearchState,
  (state: SearchState) => state.photos
);

export const selectSearchCollections = createSelector(
  selectSearchState,
  (state: SearchState) => state.collections
);

export const selectSearchUsers = createSelector(
  selectSearchState,
  (state: SearchState) => state.users
);
