import { createSelector } from "@reduxjs/toolkit";
import { CollectionState, RootState } from "@/types/stateTypes";

export const selectCollectionState = (state: RootState): CollectionState =>
  state.collection;

export const selectCollections = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.collections
);

export const selectCollectionDetails = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.collectionDetails
);

export const selectCollectionPhotos = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.collectionPhotos
);
