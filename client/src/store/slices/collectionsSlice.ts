import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCollectionById,
  fetchCollectionPhotos,
  fetchCollections,
} from "../actions/collection";
import { handleAsyncReducers } from "@/utils";
import { createAsyncState } from "@/types/stateTypes";

const initialState = {
  collections: createAsyncState([], true),
  collectionDetails: createAsyncState(null),
  collectionPhotos: createAsyncState([], true),
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    resetCollections: (state) => {
      state.collections = createAsyncState([], true);
    },
    resetCollectionDetails: (state) => {
      state.collectionDetails = createAsyncState(null);
    },
    resetCollectionPhotos: (state) => {
      state.collectionPhotos = createAsyncState([], true);
    },
    resetAllCollections: (state) => {
      state.collections = createAsyncState([], true);
      state.collectionDetails = createAsyncState(null);
      state.collectionPhotos = createAsyncState([], true);
    },
  },
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchCollections, "collections");
    handleAsyncReducers(builder, fetchCollectionById, "collectionDetails");
    handleAsyncReducers(builder, fetchCollectionPhotos, "collectionPhotos");
  },
});

export const {
  resetCollections,
  resetCollectionDetails,
  resetCollectionPhotos,
  resetAllCollections,
} = collectionsSlice.actions;
export default collectionsSlice.reducer;
